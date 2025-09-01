import type React from 'react';
import Style from './message-wrapper.module.less';

interface Props {
  data: Record<string, any>
  role: string
}

const MessageWrapper: React.FC<Props> = (props) => {
  const { role, data } = props;

  return (
    <div className={[{
      [Style.user]: role === 'user',
      [Style.bot]: role === 'user',
    }]}
    >
    </div>
  );
};

export default MessageWrapper;
