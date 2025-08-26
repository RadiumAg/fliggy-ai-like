interface ChatParams {
  chat: string
}

interface ChatCallbacks {
  onData?: (data: any) => void
  onFinish?: () => void
  onError?: (error: any) => void
  onStart?: () => void
}

/**
 *
 *
 * @param params
 * @param callbacks
 * @description 和后端交互
 *
 */
function chatWithFetch(params: ChatParams, callbacks: ChatCallbacks = {}) {
  const { chat } = params;
  const { onData, onFinish, onError, onStart } = callbacks;

  const requestData = {
    chat,
    platform: 'h5',
    h5Version: 'h5Version',
    deviceType: navigator.userAgent,
  };

  onStart?.();

  return fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(requestData),
  })
    .then(async (response) => {
      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialData = ''; // 缓存未解析完成的 JSON 数据

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // 最后尝试解析剩余的 partialData
            if (partialData.trim()) {
              try {
                const data = JSON.parse(partialData);
                onData?.(data.data);
              }
              catch (e) {
                console.warn('最终解析失败:', partialData, e);
              }
            }
            onFinish?.();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataLine = line.slice(6); // 去除 "data: " 前缀
              partialData += dataLine;
            }
            else if (!line.startsWith('event: ') && line !== '') {
              partialData += line;
            }

            if (partialData.trim()) {
              try {
                const data = JSON.parse(partialData);
                onData?.(data.data);
                partialData = ''; // 成功解析后清空缓存
              }
              catch (e) {
              // JSON 不完整，继续缓存
                console.warn('解析失败，缓存未完成的 JSON:', partialData, e);
              }
            }
          }
        }
      };

      processStream(); // 启动流处理
    })
    .catch((error) => {
      console.error('Fetch SSE 错误:', error);
      onError?.(error);
    });
}

export {
  type ChatCallbacks,
  type ChatParams,
  chatWithFetch,
};
