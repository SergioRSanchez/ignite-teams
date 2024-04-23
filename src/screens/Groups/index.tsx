import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Container } from './styles';

export function Groups() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate('new');
  };

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);

      setIsLoading(false);

    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Houve um erro ao carregar as turmas');
    }
  };

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  };

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <HighLight 
        title='Turmas' 
        subtitle='jogue com a sua turma'
      />

      {
        isLoading ? <Loading /> : (
          <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item: group }) => (
              <GroupCard 
                title={group} 
                onPress={() => handleOpenGroup(group)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message='Que tal cadastrar a primeira turma?' />
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  )
}