import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { groupCreate } from '@storage/group/groupCreate';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState('');

  async function handleNew() {
    if(group.trim().length === 0) {
      return Alert.alert('Nova turma', 'Informe o nome da turma');
    }

    try {
      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova turma', error.message);
      } else {
        console.log(error);
        return Alert.alert('Nova turma', 'Não foi possível criar a turma');
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />
      
      <Content>
        <Icon />

        <HighLight 
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button 
          title='Criar turma'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>

    </Container>
  )
}