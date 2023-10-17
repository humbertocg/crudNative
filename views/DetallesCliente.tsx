import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ScreenPropsType, {ClienteParamType} from '../types/ScreenPropsType';
import {Headline, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import api from '../api/api';
import {AxiosError} from 'axios';

const DetallesCliente = (
  props: NativeStackScreenProps<
    ScreenPropsType,
    //keyof DetallesClientePropsType
    'DetallesCliente'
  >,
) => {
  const params = props.route.params as ClienteParamType;
  const cliente =
    params !== undefined
      ? params?.cliente
      : {nombre: '', correo: '', phone: '', empresa: '', id: ''};
  const {nombre, correo, phone, empresa, id} = cliente;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Desea Eliminar este cliente?',
      'Esta acción no se puede deshacer',
      [
        {text: 'Si, eliminar', onPress: () => eliminarContacto()},
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  const eliminarContacto = async () => {
    const response = await onDeleteCliente();
    if (response) {
      props.navigation.navigate('Inicio', {isUpdate: true});
    }
  };

  const onDeleteCliente = async () => {
    let result = false;
    try {
      const response = await api.delete(`/clientes/${id}`);
      //console.log(response);
      result = response.status === 200 || response.status === 204;
    } catch (ex) {
      console.log((ex as AxiosError).response);
    }
    return result;
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono: <Subheading>{phone}</Subheading>
      </Text>
      <Button
        style={styles.btnEliminar}
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        Eliminar cliente
      </Button>
      <FAB
        icon="pencil"
        style={[globalStyles.fab, styles.fabEdit]}
        onPress={() =>
          props.navigation.navigate('NuevoCliente', {cliente: cliente})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 100,
  },
  fabEdit: {
    backgroundColor: '#FFBF00',
  },
});

export default DetallesCliente;
