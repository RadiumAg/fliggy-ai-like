import React from 'react';
import Bottom from '@/components/bottom';
import FirstScreen from '@/components/first-screen';
import Header from '@/components/header';

const Main: React.FC = () => {
  const [isFirstRender, setFirstRender] = React.useState(true);

  return (
    <div>
      <Header />
      <>{isFirstRender ? <FirstScreen /> : null}</>
      <Bottom />
    </div>
  );
};
export default Main;
