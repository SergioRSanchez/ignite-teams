import { StatusBar } from 'react-native';
import {ThemeProvider} from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'; 

import theme from '@theme/index';

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';

import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {
        fontLoaded 
        ?
        <NewGroup />
        :
        <Loading />
      }
    </ThemeProvider>
  );
}