import { createAction } from 'redux-actions';
import * as action from '../api/api';
import { AsyncStorage } from 'react-native';
import * as constant from '../constants/chatroom';
import * as constants from '../constants/usertoken';
import * as firebase from 'firebase';
const _ = require('lodash');
import { isLoading } from './loader';

function messagesRec(data) {
  return createAction(constant.MSG_REC_REQUEST)(data);
}
function isError(data) {
  return createAction(constant.MSG_REC_ERROR)(data);
}
function msgRecv(data) {
  return createAction(constant.MSG_REC_SUCCESS)(data);
}
function tokenrec(data) {
  return createAction(constants.USER_TOKEN_REQUEST)(data);
}
function tokenrecError(data) {
  return createAction(constants.USER_TOKEN_ERRORS)(data);
}
function messagesRecError(data) {
  return createAction(constant.MSG_REC_ERRORS)(data);
}
function messagesUser(data) {
  return createAction(constant.MSG_REC_USER)(data);
}
export function getmessages() {
  return function (dispatch, getState) {
    // dispatch(isLoading(true));
    return new Promise((reslove, reject) => {
      console.log('start firebase.database multiple queries');

      let { userauth, login } = getState();
      userauth = userauth.toJS();
      login = login.toJS();

      console.log('userauth', userauth);
      console.log('login', login);

      let userId = "";
      let userEmail = "";

      if (login.data && login.data != "") userId = login.data;
      if (userauth.user && userauth.user.uid) {
        userId = userauth.user.uid;
        userEmail = userauth.user.email;
      }

      if (userEmail == "admin@gmail.com") {
        firebase.database()
          .ref('/chatroom/')
          .on('value', (snapshot) => {
              // gets around Redux panicking about actions in reducers
              setTimeout(() => {
                const array = [];
                const msg = snapshot.val() || [];
                const messages = msg.message;
                const profile = msg.userinfo;
                dispatch(tokenrec(profile));
                dispatch(messagesUser(messages));
                Object.keys(messages).map((key, index) => {
                  const last = messages[key][Object.keys(messages[key])[Object.keys(messages[key]).length - 1]][0];
                  const first = messages[key][Object.keys(messages[key])[0]][0];
                  if (last) {
                    last.user.userName = first.user.firstname;
                    last.user.userAvatar = first.user.avatar;
                    last.user.userId = first.user._id;
                    array.push(last);
                  }
                });
                const latestmsg = _.orderBy(array, ['user.timeStamp'], ['desc']);
                AsyncStorage.setItem('msg', JSON.stringify(msg));
                reslove(latestmsg);
                // console.log('hjhjj');
                dispatch(messagesRec(latestmsg));
                dispatch(isLoading(false));
                dispatch(msgRecv(true));
              }, 0);
            }, (error) => {
              dispatch(isError(true));
              dispatch(tokenrecError(error));
              dispatch(messagesRecError(error));
              dispatch(isLoading(false));
            },
          );
      } else {
        firebase.database()
          .ref('/chatroom/message/')
          .orderByKey().equalTo(userId)
          .on('value', (snapshot) => {
              setTimeout(() => {
                const array = [];
                const messages = snapshot.val() || [];

                console.log('all messages');
                console.log(messages);

                dispatch(messagesUser(messages));

                Object.keys(messages).map((key, index) => {
                  const last = messages[key][Object.keys(messages[key])[Object.keys(messages[key]).length - 1]][0];
                  const first = messages[key][Object.keys(messages[key])[0]][0];
                  if (last) {
                    last.user.userName = first.user.firstname;
                    last.user.userAvatar = first.user.avatar;
                    last.user.userId = first.user._id;
                    array.push(last);
                  }
                });

                const latestmsg = _.orderBy(array, ['user.timeStamp'], ['desc']);

                AsyncStorage.setItem('messages', JSON.stringify(messages));

                reslove(latestmsg);

                dispatch(messagesRec(latestmsg));
                dispatch(isLoading(false));
                dispatch(msgRecv(true));
              }, 0);
            }, (error) => {
              dispatch(isError(true));
              dispatch(tokenrecError(error));
              dispatch(messagesRecError(error));
              dispatch(isLoading(false));
            },
          );

        firebase.database()
          .ref('/chatroom/userinfo/')
          .once('value', (snapshot) => {
            setTimeout(() => {
              const userinfo = snapshot.val() || [];

              console.log('userinfo');
              console.log(userinfo);

              AsyncStorage.setItem('userinfo', JSON.stringify(userinfo));

              dispatch(tokenrec(userinfo));
            }, 0);
          }, (error) => {
          });
      }



    });
  };
}
export function sendMessages(userid, msg) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      action.sendmessages(userid, msg);
    });
  };
}
