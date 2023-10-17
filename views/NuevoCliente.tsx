import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ScreenPropsType, {ClienteParamType} from '../types/ScreenPropsType';
import {
  Button,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import {formatPhoneNumber, validateEmail} from '../utils/utils';
import clienteType from '../types/clienteType';
import api from '../api/api';
import {AxiosError} from 'axios';

const NuevoCliente = (
  props: NativeStackScreenProps<
    ScreenPropsType,
    //keyof NuevoClientePropsType
    'NuevoCliente'
  >,
) => {
  const [nombre, setNombre] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [empresa, setEmpresa] = useState<string>('');
  const [id, setId] = useState<string>();
  const [alerta, setAlerta] = useState<boolean>(false);
  const [onSaveError, setOnSaveError] = useState<boolean>(false);
  const [isEditCliente, setIsEditCliente] = useState<boolean>(false);

  const getNombre = (nombreText: string) => {
    setNombre(nombreText);
  };

  const getPhone = (phoneText: string) => {
    const numFormatted = formatPhoneNumber(phoneText);
    setPhone(numFormatted);
  };

  const getCorreo = (correoText: string) => {
    setCorreo(correoText);
  };

  const getEmpresa = (empresaText: string) => {
    setEmpresa(empresaText);
  };

  const guardarCliente = async (isEdit: boolean) => {
    if (!validarCampos()) {
      setAlerta(true);
      return;
    }
    const cliente: clienteType = {nombre, phone, correo, empresa, id};
    const result = await onSaveClient(cliente, isEdit);
    if (result) {
      clearForm();
      props.navigation.navigate('Inicio', {isUpdate: true});
    } else {
      setOnSaveError(true);
    }
    //
  };

  const validarCampos = () => {
    return (
      nombre !== '' &&
      phone !== '' &&
      correo !== '' &&
      validateEmail(correo) !== null &&
      empresa !== ''
    );
  };

  const clearForm = () => {
    setNombre('');
    setPhone('');
    setCorreo('');
    setEmpresa('');
    setId('');
  };

  const onSaveClient = async (client: clienteType, isEdit: boolean) => {
    let result = false;
    try {
      if (isEdit) {
        const response = await api.put(`/clientes/${id}`, client);
        //console.log(response);
        result = response.status === 200;
      } else {
        const response = await api.post('/clientes', client);
        //console.log(response);
        result = response.status === 201;
      }
    } catch (ex) {
      console.log((ex as AxiosError).response);
    }
    return result;
  };

  useEffect(() => {
    const params = props.route?.params as ClienteParamType;
    if (params !== undefined) {
      setNombre(params.cliente.nombre);
      setPhone(params.cliente.phone);
      setCorreo(params.cliente.correo);
      setEmpresa(params.cliente.empresa);
      setId(params.cliente.id);
      setIsEditCliente(true);
    }
  }, [props.route]);

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{`${
        isEditCliente ? 'Editar' : 'Añadir Nuevo'
      } Cliente`}</Headline>
      <TextInput
        label="Nombre"
        placeholder="Humberto"
        style={styles.input}
        value={nombre}
        onChangeText={text => getNombre(text)}
      />
      <TextInput
        label="Teléfono"
        placeholder="(464) 123-4567"
        style={styles.input}
        value={phone}
        onChangeText={text => getPhone(text)}
      />
      <TextInput
        label="Correo"
        placeholder="micorreo@email.com"
        style={styles.input}
        value={correo}
        onChangeText={text => getCorreo(text)}
      />
      <TextInput
        label="Empresa"
        placeholder="Freelance"
        style={styles.input}
        value={empresa}
        onChangeText={text => getEmpresa(text)}
      />
      <Button
        icon={'pencil-circle'}
        mode="contained"
        onPress={() => guardarCliente(isEditCliente)}>
        {isEditCliente ? 'Editar cliente' : 'Guardar cliente'}
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={onSaveError} onDismiss={() => setOnSaveError(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Ocurrio un error al intentar guardar los datos
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOnSaveError(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
