import React from 'react';
import FirstScreen from '../../components/first-screen';

const Main: React.FC = () => {
  const [isFirstRender, setFirstRender] = React.useState(true);

  return <>{isFirstRender ? <FirstScreen /> : null}</>;
};
export default Main;
