import { combineReducers } from 'redux';
import signup from './signup';
import loader from './loader';
import login from './login';
import chatdata from './chatroom';
import getprofile from './getuserprofile';
import usertoken from './usertoken';
import nav from './navigation';
import userauth from './authcheck';

export default combineReducers({
  loader,
  signup,
  login,
  chatdata,
  getprofile,
  usertoken,
  userauth,
  nav,
});
