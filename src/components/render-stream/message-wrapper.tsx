import type { Session } from '@/store/session-store';
import type { Role } from '@/utils/type';
import classNames from 'classnames';
import React from 'react';
import HotMap from './hot-map';
import Markdown from './markdown-md';
import Style from './message-wrapper.module.less';

interface Props {
  role: Role
  data: Session['content']
}

/**
 * 聊天消息组件
 */
const MessageWrapper: React.FC<Props> = React.memo((props) => {
  const { role, data } = props;

  const renderItem = (data: Session['content']) => {
    return data.map((messageItemData) => {
      const { type, message, components, id } = messageItemData;

      switch (type) {
        case 'markdown':
          return <Markdown key={id} data={message} />;

        case 'h-map':
          return <HotMap key={id} data={components} />;

        default:
          return null;
      }
    });
  };

  return (
    <div
      className={classNames([
        Style.container,
        {
          [Style.user]: role === 'user',
          [Style.bot]: role === 'assistant',
        },
      ])}
    >
      <div className={classNames([Style.bubble])}>{renderItem(data)}</div>
    </div>
  );
});

export default MessageWrapper;
