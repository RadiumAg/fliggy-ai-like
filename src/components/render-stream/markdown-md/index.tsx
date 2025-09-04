import type React from 'react';
import MessageBubble from '@/components/message-bubble';

interface Props {
  data?: string
}

const Markdown: React.FC<Props> = (props) => {
  const { data } = props;

  return <MessageBubble>{data}</MessageBubble>;
};

export default Markdown;
