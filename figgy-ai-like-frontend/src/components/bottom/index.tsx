import classNames from 'classnames';
import TextArea from 'rc-textarea';
import React from 'react';
import { createPortal } from 'react-dom';
import Style from './index.module.less';

const Bottom: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setIsActive(true);
  }, []);

  return createPortal (
    <div className={classNames(Style.container, { [Style.active]: isActive })}>
      <div className={Style.innerWrapper}>
        <TextArea rows={1} onFocus={handleFocus} placeholder="有什么旅行问题问问我吧" className={Style.textarea} />
        <div></div>
      </div>
    </div>,
    document.body,
  );
};

export default Bottom;
