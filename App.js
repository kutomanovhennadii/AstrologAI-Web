import React from 'react';

import BackgroundImage from './src/components/common/BackgroundImage';
import SignIn from './src/components/user/signin/SignIn'
import SignUp from './src/components/user/signup/SignUp'
import GreetingForm from './src/components/user/greeting/GreetingForm'
import UserGate from './src/components/user/UserGate'
import Terms from './src/components/user/Terms'
import Verification from './src/components/user/verification/Verification'



const App = () => {
  const topOffset = 0;

  return (
    <BackgroundImage>
      {/* <Terms /> */}
      {/* <UserGate /> */}
      {/* <GreetingForm /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <Verification />
    </BackgroundImage>
  );
};



export default App;