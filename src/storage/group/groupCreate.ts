import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';

export async function groupCreate(newGroupName: string) {
  try {

    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.some(group => group.toLowerCase() === newGroupName.toLowerCase());

    if (groupAlreadyExists) {
      throw new AppError('Turma ja existe.');
    }

    const storage = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}