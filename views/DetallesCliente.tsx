import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text} from 'react-native';
import ScreenPropsType from '../types/ScreenPropsType';

const DetallesCliente = (
  props: NativeStackScreenProps<
    ScreenPropsType,
    //keyof DetallesClientePropsType
    'DetallesCliente'
  >,
) => {
  const params = props.route.params;
  console.log(params);
  return (
    <>
      <Text>Detalles Cliente</Text>
    </>
  );
};

export default DetallesCliente;
