import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';
import { GroupsGetAll } from './groupsGetAll';

export async function GroupCreate(newGroupName: string) {
  try {

    const storedGroups = await GroupsGetAll();

    const storage = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}