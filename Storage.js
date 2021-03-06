import AsyncStorage from '@react-native-async-storage/async-storage';
export const setUserData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userTokenData', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userTokenData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};
export const setUserInfo = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};
export const setUserMember = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userMember', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const getUserMember = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userMember');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};
