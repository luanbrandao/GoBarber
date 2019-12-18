import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title, List } from './styles';
import Appointment from '~/components/Appointment';
import Background from '~/components/Background';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
      </Container>
      <List
        data={data}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Appointment data={item} />}
      />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
