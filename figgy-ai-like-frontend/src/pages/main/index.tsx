import React from 'react';
import FirstScreen from '../../components/first-screen';
import Header from '../../components/header/header';

const Main: React.FC = () => {
  const [isFirstRender, setFirstRender] = React.useState(true);

  return (
    <div>
      <Header />
      <>{isFirstRender ? <FirstScreen /> : null}</>
    </div>
  );
};
export default Main;
