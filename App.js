import React from 'react';

import BackgroundImage from './src/components/common/BackgroundImage';
import SignIn from './src/components/signin/SignIn'
import SignUp from './src/components/signup/SignUp'
import GreetingForm from './src/components/greeting/GreetingForm'
import UserGate from './src/components/entryPoints/UserGate'
import UserBase from './src/components/entryPoints/UserBase'
import Terms from './src/components/terms/Terms'
import Verification from './src/components/verification/Verification'
import SubscriptionPage from './src/components/subcsription/SubscriptionPage'
import Subscription from './src/components/subcsription/Subscription'
import AstroBots from './src/components/astrobots/Astrobots'
import StartPage from './src/components/entryPoints/StartPage'
import Prediction from './src/components/prediction/Prediction';
import EntryPoint from './src/components/entryPoints/EntryPoint'

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