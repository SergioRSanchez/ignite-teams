import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Houve um erro ao adicionar');
      }
    }
  };

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playerByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);

    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Houve um erro ao carregar as pessoas');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
      
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Houve um erro ao remover essa pessoa');
    }
  };

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
      
    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', 'Houve um erro ao remover o grupo');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeGroup() }
      ]
    )
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

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
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
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

      {
        isLoading ? <Loading /> : (
          <FlatList 
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard 
                name={item.name} 
                onRemove={() => handleRemovePlayer(item.name)} 
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
        )
      }

      <Button 
        title='Remover turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Container>
  );
}