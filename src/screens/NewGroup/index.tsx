import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      
      <Content>
        <Icon />

        <HighLight 
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input />

        <Button 
          title='Criar turma'
          style={{ marginTop: 20 }}
        />
      </Content>

    </Container>
  )
}