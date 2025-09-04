import type React from 'react';
import MessageBubble from '../message-bubble';

interface Props {
  data: any
}

const HotMap: React.FC<Props> = () => {
  return (
    <MessageBubble>HotMap</MessageBubble>
  );
};

export default HotMap;
