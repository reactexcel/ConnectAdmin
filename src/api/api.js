import * as firebase from 'firebase';
import { API_URL, FirebaseConstants } from '../config/config';

export function userRegister(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return (errorCode, errorMessage);
  });
}
export function userProfileupdate(userId, fname, lname, token, avatar, businessname, reporting) {
  return firebase.database().ref(`/chatroom/userinfo/${userId}/profile`).update({
    firstname: fname,
    lastname: lname,
    cstoken: token,
    id: userId,
    avatar,
    businessname,
    reporting,
  });
}
export function userToken(data, fname, lname, token) {
  const test = new Date().getTime();
  return firebase.database().ref(`/chatroom/userinfo/${data}/profile`).set({
    firstname: fname,
    lastname: lname,
    cstoken: token,
    id: data,
    timestamp: test,
  });
}
export function userTokenUpdate(userId, token) {
  return firebase.database().ref(`/chatroom/userinfo/${userId}/profile`).update({
    cstoken: token,
  });
}
export function userStatusUpdate(userId, key) {
  return firebase.database().ref(`/chatroom/message/${userId}/${key}/0/user`).update({
    status: true,
  });
}
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function userLogin(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return (errorCode, errorMessage);
  });
}
export function sendmessages(userid, messages) {
  const newMsgRef = firebase.database().ref(`/chatroom/message/${userid}`).push();
  newMsgRef.set(messages);
}

export function sendData(body, type) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': parseInt(body.length),
    Authorization: `key=${FirebaseConstants.KEY}`,
  });
  return fetch(API_URL, { method: 'POST', headers, body })
    .then(response => (response))
    .catch(error => (error));
}
export function uploadImage(uri) {
  const storageRef = firebase.storage().ref();
  const mountainImagesRef = storageRef.child('mountains.jpg');
  return mountainImagesRef.putString(uri, 'data_url').then(snapshot => snapshot);
}
export function getSignOut() {
  const test = firebase.auth().signOut().then(val => val).catch(error => error);
  return test;
}

export function sendEmailVerification() {
  return firebase.auth().currentUser.sendEmailVerification();
}

export function resetPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}