import Image from '@rc-component/image';
import React from 'react';
import Style from './index.module.less';

const FirstScreen: React.FC = () => {
  return (
    <div className={Style.container}>
      <div className={Style.title}>
        <Image src="https://gw.alicdn.com/imgextra/i4/O1CN01eCjF761MxxwNOMW9W_!!6000000001502-2-tps-120-116.png_170x10000.jpg_.webp" />
      </div>
    </div>
  );
};
export default FirstScreen;
