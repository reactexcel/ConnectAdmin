import { StackNavigator } from 'react-navigation';
import Unauthorized from './screen/unauthorized';
import Authorized from './screen/authorized';
import SplashScreen from '../components/splashscreen/splashscreen';

const Root = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  Unauthorized: {
    screen: Unauthorized,
  },
  Authorized: {
    screen: Authorized,
  },
},
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
);
export default Root;
