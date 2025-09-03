import type { Session } from '@/store/session-store';
import classNames from 'classnames';
import React from 'react';
import Markdown from './markdown-md';
import Style from './message-wrapper.module.less';

interface Props {
  data: Session['data']
  role: string
}

const MessageWrapper: React.FC<Props> = React.memo((props) => {
  const { role, data } = props;

  const renderItem = (data: Session['data']) => {
    const { type } = data;
    switch (type) {
      case 'markdown':
        return <Markdown data={data} />;
        break;

      default:
        return null;
    }
  };

  return (
    <div
      className={classNames([
        {
          [Style.user]: role === 'user',
          [Style.bot]: role === 'bot',
        },
      ])}
    >
      <div className={classNames([Style.bubble])}>{renderItem(data)}</div>
    </div>
  );
});

export default MessageWrapper;
