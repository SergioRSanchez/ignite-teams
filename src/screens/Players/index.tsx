import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState(['João', 'Maria', 'Fernando']);

  return (
    <Container>
      <Header showBackButton />

      <HighLight 
        title='Nome da turma'
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input 
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />

        <ButtonIcon 
          icon='add'
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C']}
          keyExtractor={item => item}
          renderItem={
            ({ item }) => (
              <Filter 
                title={item} 
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )
          }
          showsVerticalScrollIndicator={false}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
    </Container>
  );
}