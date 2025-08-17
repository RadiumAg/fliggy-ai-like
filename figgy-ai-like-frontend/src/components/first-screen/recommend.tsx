import type React from 'react';
import Image from '@rc-component/image';
import Style from './recommend.module.less';

interface Props {
  icon: string
  title: string
  onClick: () => void
}

const Recommend: React.FC<Props> = (props) => {
  const { icon, title, onClick } = props;

  return (
    <div onClick={onClick} className={Style.container}>
      <Image className={Style.image} src={icon} />
      <h1>{title}</h1>
    </div>
  );
};

export default Recommend;
