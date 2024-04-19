import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroup(group);

    const filteredStorage = storage.filter(player => player.name !== playerName);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filteredStorage));

  } catch (error) {
    throw error;
  }
}