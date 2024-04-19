import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION, GROUP_COLLECTION } from '@storage/storageConfig';

import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupNameToDelete: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groups = storedGroups.filter(group => group !== groupNameToDelete);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupNameToDelete}`);

  } catch (error) {
    throw error;
  }
};