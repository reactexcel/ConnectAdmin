  import { createAction } from 'redux-actions';
  import * as action from '../api/api';
  import { AsyncStorage } from 'react-native';
  import * as constant from '../constants/authcheck';
  import * as constantss from '../constants/chatroom';
  import * as constants from '../constants/usertoken';
  import { isLoading } from './loader';
  import * as firebase from 'firebase';
  import { NavigationActions } from 'react-navigation';
  const _ = require('lodash');

  import * as signup from './signup';

  import * as actionchat from './chatroom';

  function userVerifyed(data) {
    return createAction(constant.USER_AUTH_VERIFY)(data);
  }
  function userAuthSuccess(data) {
    return createAction(constant.USER_AUTH_ERROR)(data);
  }
  function tokenrec(data) {
    return createAction(constants.USER_TOKEN_REQUEST)(data);
  }
  function messagesUser(data) {
    return createAction(constantss.MSG_REC_USER)(data);
  }
  function messagesRec(data) {
    return createAction(constantss.MSG_REC_REQUEST)(data);
  }
  function msgRecv(data) {
    return createAction(constantss.MSG_REC_SUCCESS)(data);
  }
  function updateNeedVerifyEmail(data) {
    return createAction(constant.NEED_VERIFY_EMAIL)(data);
  }
  function updateDidSentEmailVerification(data) {
    return createAction(constant.DID_SENT_EMAIL_VERIFICATION)(data);
  }


  function adminAuth(dispatch, user) {
    AsyncStorage.getItem('msg', (err, result) => {
      if (result !== null && result !== 'signout') {
        const msg = JSON.parse(result) || [];
        const messages = msg.message;
        const profile = msg.userinfo;
        const array = [];
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
        dispatch(userVerifyed(user));
        dispatch(tokenrec(profile));
        dispatch(messagesUser(messages));
        dispatch(messagesRec(latestmsg));
        dispatch(isLoading(false));
        dispatch(msgRecv(true));
      }
      dispatch(userVerifyed(user));
      dispatch(userAuthSuccess(true));
      const navigateAction = NavigationActions.navigate({
        routeName: 'Authorized',
        params: user.email,
        action: NavigationActions.navigate({ routeName: 'Drawer' }),
      });
      dispatch(navigateAction);
    });

    setTimeout(() => {
      // dispatch(isLoading(true));
      // dispatch(msgRecv(false));
      dispatch(actionchat.getmessages());
    }, 1000);
  }

  let needVerifyEmail = false;

  export function verifyAuth() {
    return function (dispatch) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('verify user');
          console.log(user);

          if (user.email == "admin@gmail.com") {
            adminAuth(dispatch, user);
          } else {
            AsyncStorage.getItem('messages', (err, result) => {
              if (result) {
                const messages = JSON.parse(result) || [];

                const array = [];
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

                dispatch(userVerifyed(user));

                dispatch(messagesUser(messages));
                dispatch(messagesRec(latestmsg));

                dispatch(isLoading(false));
                dispatch(msgRecv(true));
              }

              dispatch(userVerifyed(user));
              dispatch(userAuthSuccess(true));

              if (user.emailVerified) {
                needVerifyEmail = false;
                dispatch(updateNeedVerifyEmail(needVerifyEmail));

                const navigateAction = NavigationActions.navigate({
                  routeName: 'Authorized',
                  params: user.email,
                  action: NavigationActions.navigate({ routeName: 'Drawer' }),
                });
                dispatch(navigateAction);
              } else {
                needVerifyEmail = true;
                dispatch(updateNeedVerifyEmail(needVerifyEmail));
                dispatch(signup.sendEmailVerification(user.email));

                dispatch(signup.signout());
              }
            });

            if (user.emailVerified) {
              AsyncStorage.getItem('userinfo', (err, result) => {
                if (result) {
                  const profile = JSON.parse(result) || [];
                  dispatch(tokenrec(profile));
                }
              });

              setTimeout(() => {
                // dispatch(isLoading(true));
                // dispatch(msgRecv(false));
                dispatch(actionchat.getmessages());
              }, 50);
            }
          }
        } else {
          dispatch(userVerifyed(''));
          dispatch(userAuthSuccess(false));

          if (needVerifyEmail) {
            const navigateAction = NavigationActions.navigate({
              routeName: 'Unauthorized',
              params: { needVerifyEmail: true },
              action: NavigationActions.navigate({ routeName: 'LogIn' }),
            });
            dispatch(navigateAction);
          } else {
            const navigateAction = NavigationActions.navigate({
              routeName: 'Unauthorized',
              action: NavigationActions.navigate({ routeName: 'Main' }),
            });
            dispatch(navigateAction);
          }
        }
      });
    };
  }
