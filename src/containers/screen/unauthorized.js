import { StackNavigator } from 'react-navigation';
// import SplashScreen from '../../components/splashscreen/splashscreen';
import SignupPage from '../../components/signuppage/signuppage';
import LoginPage from '../../components/loginpage/loginpage';
import ForgotPasswordPage from '../../components/forgotpassword/forgotpassword';
import Application from '../../components/drawer/drawer';
import AdminChat from '../../components/adminchat/adminchat';
import UserProfile from '../../components/userprofile/userprofile';
import StartPage from '../../components/startpage/startpage';
import SplashScreen from '../../components/splashscreen/splashscreen';

const Unauthorized = StackNavigator({
  Main: {
    screen: StartPage,
  },
  SignUp: {
    screen: SignupPage,
  },
  LogIn: {
    screen: LoginPage,
  },
  ForgotPass: {
    screen: ForgotPasswordPage,
  }
},
  { initialRouteName: 'Main' },
);
export default Unauthorized;
