import React from 'react';

import BackgroundImage from './src/components/common/BackgroundImage';
import SignIn from './src/components/user/signin/SignIn'
import SignUp from './src/components/user/signup/SignUp'
import GreetingForm from './src/components/user/greeting/GreetingForm'
import UserGate from './src/components/user/UserGate'
import UserBase from './src/components/user/UserBase'
import Terms from './src/components/user/Terms'
import Verification from './src/components/user/verification/Verification'
import SubscriptionPage from './src/components/user/subsription/SubscriptionPage'
import Subscription from './src/components/user/subsription/Subscription'
import AstroBots from './src/components/user/astrobots/Astrobots'
import StartPage from './src/components/user/StartPage'


const App = () => {
  const topOffset = 0;

  return (
    <BackgroundImage>
      {/* <StartPage /> */}
      {/* <Terms /> */}
      {/* <UserGate /> */}
      {/* <GreetingForm /> */}
      <SignIn />
      {/* <SignUp /> */}
      {/* <Verification /> */}
      {/* <Subscription /> */}
      {/* <AstroBots /> */}
      {/* <UserBase/> */}
    </BackgroundImage>
  );
};



export default App;