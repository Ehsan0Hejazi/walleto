import React from 'react';
import { View, StatusBar, I18nManager, LogBox } from 'react-native';
import { Provider, provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import BottomSheet from './src/components/BottomSheet';
// import Modal from './src/components/ModalView';
import RootView from './src/RootView';

I18nManager.allowRTL(false);
LogBox.ignoreAllLogs()

function App() {
  return (
    <SafeAreaProvider>
    <StatusBar backgroundColor="#13263a" />
    <Provider store={store}>
      <Navigation />
      <RootView />
    </Provider>
    </SafeAreaProvider>
  )
}

export default App;