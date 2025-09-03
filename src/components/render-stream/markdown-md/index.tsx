import type React from 'react';

interface Props {
  data?: string
}

const Markdown: React.FC<Props> = (props) => {
  const { data } = props;

  return <div>{data}</div>;
};

export default Markdown;
