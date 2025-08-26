import express from 'express';
import { runProxy } from './proxy';

const app = express();
const page = runProxy();

const PORT = 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// CORS 中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// 处理聊天请求的通用函数
async function handleChatRequest(requestData: any, res: any, req: any) {
  try {
    const pageInstance = await page;

    // 设置 SSE 必需的响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });

    // 可选：设置客户端重连时间（毫秒）
    res.write('retry: 10000\n\n');

    // 发送数据的函数
    const sendEvent = (data: any, event = 'message') => {
      // 格式: event: <event-name>\ndata: <data>\n\n
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`); // data 行必须以 \n 结尾，事件以 \n\n 结尾
    };

    // 生成唯一的回调函数名（避免多个请求冲突）
    const callbackId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const receiveDataFnName = `onNodeReceiveData_${callbackId}`;
    const finishFnName = `onNodeFinish_${callbackId}`;
    const failureFnName = `onNodeFailure_${callbackId}`;

    // 暴露回调函数到浏览器环境
    await pageInstance.exposeFunction(receiveDataFnName, (data: any) => {
      console.log('收到流式数据:', data);
      sendEvent({ data }, 'data');
    });

    await pageInstance.exposeFunction(finishFnName, (data: any) => {
      console.log('请求完成:', data);
      sendEvent({ data, finished: true }, 'finish');
      res.end(); // 结束SSE连接
    });

    await pageInstance.exposeFunction(failureFnName, (error: any) => {
      console.error('请求失败:', error);
      sendEvent({ error, failed: true }, 'error');
      res.end(); // 结束SSE连接
    });

    // 在浏览器环境中执行请求
    await pageInstance.evaluate((data, receiveDataFnName, finishFnName, failureFnName) => {
      if (window.__HUBBLE && window.__HUBBLE.request) {
        window.__HUBBLE.request({
          api: 'mtop.alitrip.fliggy.channel.ai.plan.chat',
          v: '2.0',
          data,
          onReceiveData(streamData: any) {
            // 调用暴露给浏览器的Node.js函数
            (window as any)[receiveDataFnName](streamData);
          },
          onFinish(finishData: any) {
            (window as any)[finishFnName](finishData);
          },
          onFailure(errorData: any) {
            (window as any)[failureFnName](errorData);
          },
          useStream: true,
        });
      }
      else {
        (window as any)[failureFnName]({ message: '__HUBBLE 对象不存在，请确保页面已正确加载' });
      }
    }, requestData, receiveDataFnName, finishFnName, failureFnName);

    // 监听客户端断开连接
    req.on('close', () => {
      console.log('客户端断开连接');
      // 清理暴露的函数
      pageInstance.evaluate((receiveDataFnName, finishFnName, failureFnName) => {
        delete (window as any)[receiveDataFnName];
        delete (window as any)[finishFnName];
        delete (window as any)[failureFnName];
      }, receiveDataFnName, finishFnName, failureFnName);
    });
  }
  catch (error) {
    console.error('处理聊天请求时出错:', error);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '服务器内部错误' }));
    }
  }
}

// POST 路由
app.post('/api/chat', async (req, res) => {
  const data = req.body;
  await handleChatRequest(data, res, req);
});

// GET 路由（支持query参数）
app.get('/api/chat', async (req, res) => {
  try {
    // 解析 query 参数中的 data
    const dataParam = req.query.data as string;
    if (!dataParam) {
      res.status(400).json({ error: '缺少 data 参数' });
      return;
    }

    const data = JSON.parse(dataParam);
    await handleChatRequest(data, res, req);
  }
  catch (error) {
    console.error('解析GET参数时出错:', error);
    res.status(400).json({ error: '无效的data参数格式' });
  }
});

// ==================== 启动服务器 ====================
app.listen(PORT, () => {
  console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
