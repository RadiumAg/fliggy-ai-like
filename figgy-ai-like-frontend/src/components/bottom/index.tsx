import classNames from 'classnames';
import TextArea from 'rc-textarea';
import React from 'react';
import Style from './index.module.scss';

const Bottom: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);

  const handleFocus = React.useCallback(() => {}, []);

  return (
    <div className={classNames(Style.container, { [Style.active]: isActive })}>
      <TextArea onFocus={handleFocus}></TextArea>
      <div></div>
    </div>
  );
};

export default Bottom;
