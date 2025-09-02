import type React from 'react';
import classNames from 'classnames';
import Style from './message-wrapper.module.less';

interface Props {
  data: Record<string, any>
  role: string
}

const MessageWrapper: React.FC<Props> = (props) => {
  const { role, data } = props;

  const renderItem = (data) => {
    const { type } = data;
    switch (type) {
      case '':

        break;

      default:
        break;
    }
  };

  return (
    <div className={classNames([{
      [Style.user]: role === 'user',
      [Style.bot]: role === 'bot',
    }])}
    >
      <div className={classNames([Style.bubble])}>
        {

        }
      </div>
    </div>
  );
};

export default MessageWrapper;
