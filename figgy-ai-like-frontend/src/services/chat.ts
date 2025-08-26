import { fliggyAxios } from './figgy-axios';

function chat(params: {
  chat: string
}) {
  const { chat } = params;

  return fliggyAxios.get('/chat', {
    params: {
      data: JSON.stringify({
        chat,
        platform: 'h5',
        h5Version: 'h5Version',
        deviceType: navigator.userAgent,
      }),
    },
  });
}

export {
  chat,
};
