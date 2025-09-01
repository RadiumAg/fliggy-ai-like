import type React from 'react';
import classNames from 'classnames';
import Style from './message-wrapper.module.less';

interface Props {
  data: Record<string, any>
  role: string
}

const MessageWrapper: React.FC<Props> = (props) => {
  const { role, data } = props;

  return (
    <div className={classNames([{
      [Style.user]: role === 'user',
      [Style.bot]: role === 'bot',
    }])}
    >
    </div>
  );
};

export default MessageWrapper;
