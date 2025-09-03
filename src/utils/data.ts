import shortid from 'shortid';

function dataFormat(data: Record<string, any>) {
  const content = data.message;

  return {
    id: shortid.generate(),
    type: 'markdown',
    data: {
      content: content || '',
      config: {
        containerClassName: '',
      },
    },
  };
}

export {
  dataFormat,
};
