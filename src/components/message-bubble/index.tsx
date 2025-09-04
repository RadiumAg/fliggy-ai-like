import type { PropsWithChildren } from 'react';
import type React from 'react';
import Style from './index.module.less';

interface Props {
  background?: string
}

const MessageBubble: React.FC<PropsWithChildren<Props>> = (props) => {
  const { background = '#fff' } = props;

  return <div style={{ background }} className={Style.messageBubble}>{props.children}</div>;
};

export default MessageBubble;
