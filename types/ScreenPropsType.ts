import {ParamListBase} from '@react-navigation/native';

interface ScreenPropsType extends ParamListBase {
  BarraNavegacion?: {userId: string};
  NuevoCliente?: {userId: string};
  DetallesCliente?: {userId: string};
  Inicio?: any;
}

export default ScreenPropsType;
