import { StackNavigator, TabNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import SignupPage from '../../components/signuppage/signuppage';
import LoginPage from '../../components/loginpage/loginpage';
import Application from '../../components/drawer/drawer';
import AdminChat from '../../components/adminchat/adminchat';
import UserProfile from '../../components/userprofile/userprofile';
import StartPage from '../../components/startpage/startpage';

const Authorized = StackNavigator({
  Drawer: {
    screen: Application,
  },
  Profile: {
    screen: UserProfile,
  },
  AdminChat: {
    screen: AdminChat,
  },
},
  {
    initialRouteName: 'Drawer',
  },
);

export default Authorized;
