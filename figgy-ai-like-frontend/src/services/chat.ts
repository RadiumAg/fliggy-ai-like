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
        deviceType: navigator.userAgent,
      }),
      ttid: '201300@travel_h5_3.1.0',
      appKey: '12574478',
      t: Date.now(),
      needLogin: false,
      xAcceptStream: true,
      type: 'originaljson',
    },

  });
}

export {
  chat,
};
