import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';

import { Container, Form } from './styles';

export function Players() {
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
    </Container>
  );
}