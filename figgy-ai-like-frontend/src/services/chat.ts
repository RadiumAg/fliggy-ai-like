interface ChatParams {
  chat: string
}

interface ChatCallbacks {
  onData?: (data: any) => void
  onFinish?: (data: any) => void
  onError?: (error: any) => void
  onStart?: () => void
}

// 使用 EventSource 进行 SSE 连接
function chatWithSSE(params: ChatParams, callbacks: ChatCallbacks = {}) {
  const { chat } = params;
  const { onData, onFinish, onError, onStart } = callbacks;

  // 构建请求数据
  const requestData = {
    chat,
    platform: 'h5',
    h5Version: 'h5Version',
    deviceType: navigator.userAgent,
  };

  // 使用 POST 请求发送数据并建立 SSE 连接
  const eventSource = new EventSource(`/api/chat?data=${encodeURIComponent(JSON.stringify(requestData))}`);

  onStart?.();

  eventSource.addEventListener('start', (event) => {
    const data = JSON.parse(event.data);
    console.log('SSE 连接已建立:', data.message);
  });

  eventSource.addEventListener('data', (event) => {
    const response = JSON.parse(event.data);
    onData?.(response.data);
  });

  eventSource.addEventListener('finish', (event) => {
    const response = JSON.parse(event.data);
    onFinish?.(response.data);
    eventSource.close();
  });

  eventSource.addEventListener('error', (event) => {
    const response = JSON.parse(event.data);
    onError?.(response.error);
    eventSource.close();
  });

  eventSource.onerror = (error) => {
    console.error('SSE 连接错误:', error);
    onError?.(error);
    eventSource.close();
  };

  // 返回可用于手动关闭连接的函数
  return {
    close: () => eventSource.close(),
    readyState: () => eventSource.readyState,
  };
}

// 使用 fetch API 的替代方案
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
    .then((response) => {
      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      function readChunk(): Promise<void> {
        return reader.read().then(({ done, value }) => {
          if (done) {
            onFinish?.(null);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.finished) {
                  onFinish?.(data.data);
                }
                else if (data.error) {
                  onError?.(data.error);
                }
                else {
                  onData?.(data.data);
                }
              }
              catch (e) {
                debugger;
                console.warn('解析SSE数据失败:', line, e);
              }
            }
          }

          return readChunk();
        });
      }

      return readChunk();
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
  chatWithSSE,
};
