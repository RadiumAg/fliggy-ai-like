import type React from 'react';
import Image from '@rc-component/image';
import Style from './recommend.module.less';

interface Props {
  icon: string
  title: string
}

const Recommend: React.FC<Props> = (props) => {
  const { icon, title } = props;

  return (
    <div className={Style.container}>
      <Image className={Style.image} src={icon} />
      <h1>{title}</h1>
    </div>
  );
};

export default Recommend;
