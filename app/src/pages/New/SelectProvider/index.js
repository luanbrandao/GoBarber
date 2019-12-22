import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

export default function SelectProvider() {
  return <Text>OK</Text>;
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
});
