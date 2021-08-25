import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from "axios";

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feed from './components/Feed/Feed';
import Posts from "./components/Posts/Posts";
import NewPost from "./components/NewPost/NewPost";
import Profile from './components/Profile/Profile';
import Logout from "./components/Logout/Logout";
import Error from './components/Error/Error';
import NoInternet from './components/NoInternet/NoInternet';
import ViewPost from './components/ViewPost/ViewPost';
import OTPEmail from "./components/OTPEmail/OTPEmail";
import OTPEntry from "./components/OTPEntry/OTPEntry";
import OTPPassword from './components/OTPPassword/OTPPassword';


export default function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component= {Home} />
        <Route path="/login" exact component = {Login} />
        <Route path="/signup" exact component = {Signup} />
        <Route path="/Account/Feed" exact component = {Feed} />
        <Route path="/Account/Feed/View/Post/:id" component={ViewPost} />
        <Route path="/Account/Posts/View/Post/:id" component={ViewPost} />
        <Route path="/Account/Posts" exact component = {Posts} />
        <Route path="/Account/NewPost" exact component = {NewPost} />
        <Route path="/Account/Profile" exact component = {Profile} />
        <Route path="/forgotPassword" exact component = {OTPEmail} />
        <Route path="/forgotPassword/otpEntry" exact component = {OTPEntry}/>
        <Route path="/forgotPassword/reset" exact component = {OTPPassword} />
        <Route path="/Account/logout" exact component={Logout} />
        <Route path="/noInternet/" exact component = {NoInternet} />
        <Route path="/userAgreement/" exact/>
        <Route path="/privacyPolicy/" exact/>
        <Route path="/cookiePolicy/" exact/>


        <Route  component={Error}/>
      </Switch>
    </BrowserRouter>
  )
}