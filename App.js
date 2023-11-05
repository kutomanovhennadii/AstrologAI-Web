import React from 'react';

import BackgroundImage from './src/components/common/BackgroundImage';
import SignIn from './src/components/user/signin/SignIn'
import SignUp from './src/components/user/signup/SignUp'
import GreetingForm from './src/components/user/greeting/GreetingForm'
import UserGate from './src/components/user/UserGate'
import UserBase from './src/components/user/UserBase'
import Terms from './src/components/user/Terms'
import Verification from './src/components/user/verification/Verification'
import SubscriptionPage from './src/components/user/subcsription/SubscriptionPage'
import Subscription from './src/components/user/subcsription/Subscription'
import AstroBots from './src/components/user/astrobots/Astrobots'
import StartPage from './src/components/user/StartPage'
import Prediction from './src/components/user/prediction/Prediction';
import EntryPoint from './src/components/user/EntryPoint'

import { UserProvider } from './src/context/UserContext';


const App = () => {


  return (
    <UserProvider>
      <BackgroundImage>
        <EntryPoint />
        {/* <StartPage /> */}
        {/* <Terms /> */}
        {/* <UserGate /> */}
        {/* <GreetingForm /> */}
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <Verification /> */}
        {/* <Subscription /> */}
        {/* <AstroBots /> */}
        {/* <UserBase /> */}
        {/* <Prediction /> */}
      </BackgroundImage>
    </UserProvider>

  );
};



export default App;