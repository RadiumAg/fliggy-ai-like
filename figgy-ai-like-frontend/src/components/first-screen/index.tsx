import Image from '@rc-component/image';
import React from 'react';
import Style from './index.module.less';
import Recommend from './recommend';

const recommendData = [{
  title: '为我发现目的地',
  icon: '//gw.alicdn.com/imgextra/i1/O1CN01VZ5GQM25WAbuh2Hpt_!!6000000007533-2-tps-72-72.png_110x10000.jpg_.webp',
}, {
  title: '为我找便宜机票',
  icon: '//gw.alicdn.com/imgextra/i3/O1CN01eLyQhE1neGWkRUZPe_!!6000000005114-2-tps-72-72.png_110x10000.jpg_.webp',
}, {
  title: '为我规划行程',
  icon: '//gw.alicdn.com/imgextra/i4/O1CN01g9f9LJ280yTtL0eu5_!!6000000007871-2-tps-72-72.png_110x10000.jpg_.webp',
}, {
  title: '为我找特色酒店',
  icon: '//gw.alicdn.com/imgextra/i1/O1CN01iVH6521bUObQJ41Mq_!!6000000003468-2-tps-72-72.png_110x10000.jpg_.webp',
}];

const FirstScreen: React.FC = () => {
  const recommendArray = React.useMemo(() => {
    return recommendData.map((data, index) => {
      const { icon, title } = data;

      return <Recommend key={index} icon={icon} title={title} />;
    });
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.title}>
        <Image className={Style.image} src="https://gw.alicdn.com/imgextra/i4/O1CN01eCjF761MxxwNOMW9W_!!6000000001502-2-tps-120-116.png_170x10000.jpg_.webp" />
        <h1>你的7x24小时AI团队</h1>
        <h1>将灵光乍现转化为完美旅程</h1>
      </div>

      <div className={Style.recommend}>
        {recommendArray}
      </div>
    </div>
  );
};

export default FirstScreen;
