import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@EventFlow:token";
const USER_KEY = "@EventFlow:user";
const THEME = "@EventFlow:theme";

export const storage = {
  async saveAuthData(token: string, user: object) {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [USER_KEY, JSON.stringify(user)],
      [THEME, "dark"],
    ]);
  },

  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async getTheme() {
    return await AsyncStorage.getItem(THEME);
  },

  async saveTheme(theme: "light" | "dark") {
    await AsyncStorage.setItem(THEME, theme);
  },

  async getUser() {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  async clear() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};
