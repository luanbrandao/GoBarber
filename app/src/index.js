import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import Routes from './routes';
// yarn add react-native-linear-gradient
// react-native link react-native-linear-gradient
// yarn add styled-components
// yarn add prop-types
// yarn add react-native-vector-icons
// react-native-gesture-handler
// yarn add react-navigation
// yarn add react-native-reanimated react-native-gesture-handler react-native-screens@^1.0.0-alpha.23
// yarn add reactotron-react-native reactotron-redux reactotron-redux-saga
// yarn add redux  redux-saga react-redux
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
