import { fliggyAxios } from './figgy-axios';

function chat(params: {
  chat: string
}) {
  const { chat } = params;

  return fliggyAxios.post('/chat', {
    chat,
    platform: 'h5',
    h5Version: 'h5Version',
    deviceType: navigator.userAgent,
  });
}

export {
  chat,
};
