import axios from 'axios';
import express from 'express';
import { runProxy } from './proxy';

const app = express();
const page = runProxy();

const PORT = 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

app.get('/api/chat', (req, res) => {
  const { query } = req;

  console.log('[DEBUG]', query);

  page.then(async (pageInstance) => {
    const result = await pageInstance.evaluate(() => {
      return axios.get('https://h5api.m.taobao.com/h5/mtop.alitrip.fliggy.channel.ai.plan.chat/2.0', {
        params: query,
      });
    });

    console.log('[DEBUG]', result);
  });

  // 设置 SSE 必需的响应头
  // res.writeHead(200, {
  //   'Content-Type': 'text/event-stream',
  //   'Cache-Control': 'no-cache',
  //   'Connection': 'keep-alive',
  //   // 可选：设置 CORS，如果前端在不同域名下
  //   // 'Access-Control-Allow-Origin': '*',
  //   // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  // });

  // // 可选：设置客户端重连时间（毫秒）
  // res.write('retry: 10000\n\n');

  // // 模拟发送数据的函数
  // const sendEvent = (data, event = 'message') => {
  //   // 格式: event: <event-name>\ndata: <data>\n\n
  //   res.write(`event: ${event}\n`);
  //   res.write(`data: ${JSON.stringify(data)}\n\n`); // data 行必须以 \n 结尾，事件以 \n\n 结尾
  // };

  // // 发送一个欢迎事件
  // sendEvent({ message: '欢迎连接到 SSE 服务！' }, 'welcome');

  // // 模拟定时发送数据 (例如：每 3 秒发送一次时间)
  // const intervalId = setInterval(() => {
  //   sendEvent({ time: new Date().toISOString(), message: '这是定时消息' }, 'timeUpdate');
  // }, 3000);

  // // 监听客户端断开连接
  // req.on('close', () => {
  //   console.log('客户端断开连接');
  //   clearInterval(intervalId); // 清理定时器
  //   // res.end(); // 通常 close 事件触发时连接已断，end() 可能会报错，可省略
  // });
});

// ==================== 启动服务器 ====================
app.listen(PORT, () => {
  console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
