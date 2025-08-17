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
      ttid: '201300@travel_h5_3.1.0',
      appKey: '12574478',
      t: Date.now(),
      needLogin: true,
      xAcceptStream: true,
      type: 'originaljson',
      sign: '0390fb9f4138c7a786d061071f6f9f04',
    },
  });
}

export {
  chat,
};
