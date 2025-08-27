import React from 'react';
import Bottom from '@/components/bottom';
import ChatContainer from '@/components/chat-container';
import FirstScreen from '@/components/first-screen';
import Header from '@/components/header';
import Style from './index.module.less';

const Main: React.FC = () => {
  const [isFirstRender, setFirstRender] = React.useState(true);

  const handleItemClick = () => {
    setFirstRender(false);
  };

  return (
    <div className={Style.container}>
      <Header />
      <>{isFirstRender ? <FirstScreen onItemClick={handleItemClick} /> : <ChatContainer />}</>
      <Bottom />
    </div>
  );
};
export default Main;
