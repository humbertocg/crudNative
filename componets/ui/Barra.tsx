import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Text, Button} from 'react-native-paper';
import ScreenPropsType from '../../types/ScreenPropsType';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../theme/theme';

const BarraSuperior = (
  props: NativeStackScreenProps<
    ScreenPropsType,
    //keyof DetallesClientePropsType
    'BarraNavegacion'
  >,
) => {
  const handlePress = (e: GestureResponderEvent): void => {
    props.navigation.navigate('NuevoCliente');
  };

  return (
    /*<Button icon="plus" textColor="#FFF" onPress={handlePress}>
      Nuevo Cliente
    </Button>*/
    <Icon.Button
      name="add-circle-outline"
      backgroundColor={theme.colors.primary}
      onPress={handlePress}>
      Cliente
    </Icon.Button>
  );
};

export default BarraSuperior;
