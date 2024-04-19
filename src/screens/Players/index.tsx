import { useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />

      <HighLight 
        title={group}
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
          data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F', 'Time G','Time H','Time I','Time J',]}
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
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item} 
            onRemove={() => {}} 
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
      />

      <Button 
        title='Remover turma'
        type='SECONDARY'
      />
    </Container>
  );
}