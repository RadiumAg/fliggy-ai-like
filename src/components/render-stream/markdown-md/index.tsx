import type React from 'react';
import * as ReactMarkdown from 'react-markdown';
import MessageBubble from '@/components/render-stream/message-bubble';

interface Props {
  data?: string
}

const Markdown: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <MessageBubble>
      <ReactMarkdown.default>
        {data}
      </ReactMarkdown.default>
    </MessageBubble>
  );
};

export default Markdown;
