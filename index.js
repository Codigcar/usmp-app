/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initBackgroundMessageHandler } from './src/utils/firebase';

initBackgroundMessageHandler()


AppRegistry.registerComponent(appName, () => App);
