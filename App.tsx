import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Inicio from './views/inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './componets/ui/Barra';
import theme from './theme/theme';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={props => ({
              headerTitleAlign: 'center',
              headerLeft: () => <BarraSuperior {...props} />,
            })}
          />
          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{title: 'Nuevo Cliente'}}
          />
          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{title: 'Detalles Cliente'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
