import type React from 'react';
import Style from './recommend.module.less';

interface Props {
  icon: string
  title: string
}

const Recommend: React.FC<Props> = () => {
  return <div className={Style.container}></div>;
};

export default Recommend;
