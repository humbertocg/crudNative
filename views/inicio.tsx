import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import ScreenPropsType, {InicioScreenParamType} from '../types/ScreenPropsType';
import api from '../api/api';
import {AxiosError} from 'axios';
import clienteType from '../types/clienteType';
import {FAB, Headline, List, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/global';

const Inicio = (props: NativeStackScreenProps<any>) => {
  const [clientes, setClientes] = useState<clienteType[]>();

  const getClientes = async () => {
    try {
      const result = await api.get('/clientes');
      if (result.status === 200) {
        setClientes(result.data);
      }
    } catch (ex) {
      console.log(ex as AxiosError);
    }
  };

  const itemDetail = (cliente: clienteType) => {
    return (
      <View>
        <Text variant="labelMedium">{cliente.correo}</Text>
        <Text variant="labelMedium">{cliente.empresa}</Text>
        <Text variant="labelSmall">{cliente.phone}</Text>
      </View>
    );
  };

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    const params = props.route.params as InicioScreenParamType;
    if (params?.isUpdate === true) {
      getClientes();
    }
  }, [props.route]);

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>
        {clientes !== undefined && clientes?.length > 0
          ? 'Clientes'
          : 'Aún no hay clientes'}
      </Headline>
      <FlatList
        data={clientes}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={itemDetail(item)}
            descriptionNumberOfLines={2}
            left={props1 => <List.Icon {...props1} icon="account" />}
            onPress={() => {
              props.navigation.navigate('DetallesCliente', {cliente: item});
            }}
          />
        )}
        keyExtractor={(item, index) => item.id ?? index.toString()}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => props.navigation.navigate('NuevoCliente')}
      />
    </View>
  );
};

export default Inicio;
