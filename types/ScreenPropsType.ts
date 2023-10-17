import {ParamListBase} from '@react-navigation/native';
import clienteType from './clienteType';

interface ScreenPropsType extends ParamListBase {
  BarraNavegacion?: {userId: string};
  NuevoCliente?: ClienteParamType;
  DetallesCliente?: ClienteParamType;
  Inicio?: InicioScreenParamType;
}

export type InicioScreenParamType = {
  isUpdate: boolean;
};

export type ClienteParamType = {
  cliente: clienteType;
};

export default ScreenPropsType;
