import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState('');

  function handleNew() {
    if(group.trim().length === 0) {
      return;
    }
    
    navigation.navigate('players', { group });
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