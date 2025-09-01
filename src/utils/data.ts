import shortid from 'shortid';

function dataFormat(data: Record<string, any>) {
  const content = data.message;

  return {
    id: shortid.generate(),
    type: 'voiceMarkdown',
    data: {
      content: content || '',
      config: {
        wyw: true,
        containerClassName: '',
      },
    },
    isEnd: true,
  };
}

export {
  dataFormat,
};
