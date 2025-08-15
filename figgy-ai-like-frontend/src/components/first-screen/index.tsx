import Image from '@rc-component/image';
import React from 'react';
import Style from './index.module.less';

const FirstScreen: React.FC = () => {
  return (
    <div className={Style.container}>
      <div className={Style.title}>
        <Image className={Style.image} src="https://gw.alicdn.com/imgextra/i4/O1CN01eCjF761MxxwNOMW9W_!!6000000001502-2-tps-120-116.png_170x10000.jpg_.webp" />
        <h1>你的7x24小时AI团队</h1>
        <h1>将灵光乍现转化为完美旅程</h1>
      </div>

      <div className={Style.recommend}></div>
    </div>
  );
};

export default FirstScreen;
