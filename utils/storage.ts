import AsyncStorage from "@react-native-async-storage/async-storage";

const VISITED_BEACHES_KEY = "visited_beaches";
const VISITED_MOUNTAINS_KEY = "visited_mountains";
const USER_PROFILE_KEY = "user_profile";

export interface UserProfile {
  name: string;
  avatarIndex: number;
}

export async function getVisitedBeaches(): Promise<Set<string>> {
  try {
    const data = await AsyncStorage.getItem(VISITED_BEACHES_KEY);
    if (data) {
      return new Set(JSON.parse(data));
    }
  } catch (error) {
    console.error("Error loading visited beaches:", error);
  }
  return new Set();
}

export async function saveVisitedBeaches(visited: Set<string>): Promise<void> {
  try {
    await AsyncStorage.setItem(
      VISITED_BEACHES_KEY,
      JSON.stringify(Array.from(visited))
    );
  } catch (error) {
    console.error("Error saving visited beaches:", error);
  }
}

export async function getVisitedMountains(): Promise<Set<string>> {
  try {
    const data = await AsyncStorage.getItem(VISITED_MOUNTAINS_KEY);
    if (data) {
      return new Set(JSON.parse(data));
    }
  } catch (error) {
    console.error("Error loading visited mountains:", error);
  }
  return new Set();
}

export async function saveVisitedMountains(visited: Set<string>): Promise<void> {
  try {
    await AsyncStorage.setItem(
      VISITED_MOUNTAINS_KEY,
      JSON.stringify(Array.from(visited))
    );
  } catch (error) {
    console.error("Error saving visited mountains:", error);
  }
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const data = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading user profile:", error);
  }
  return { name: "Traveler", avatarIndex: 0 };
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      VISITED_BEACHES_KEY,
      VISITED_MOUNTAINS_KEY,
    ]);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
