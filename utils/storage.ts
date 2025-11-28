import AsyncStorage from "@react-native-async-storage/async-storage";

const VISITED_BEACHES_KEY = "visited_beaches";
const VISITED_MOUNTAINS_KEY = "visited_mountains";
const USER_PROFILE_KEY = "user_profile";
const NOTES_KEY = "destination_notes";
const FAVORITES_KEY = "favorites";

export interface UserProfile {
  name: string;
  avatarIndex: number;
}

export interface DestinationNote {
  id: string;
  destinationId: string;
  type: "beach" | "mountain";
  content: string;
  createdAt: number;
  updatedAt: number;
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

export async function getNotes(): Promise<Record<string, DestinationNote>> {
  try {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading notes:", error);
  }
  return {};
}

export async function getNote(
  destinationId: string,
  type: "beach" | "mountain"
): Promise<DestinationNote | null> {
  try {
    const notes = await getNotes();
    const key = `${type}_${destinationId}`;
    return notes[key] || null;
  } catch (error) {
    console.error("Error loading note:", error);
  }
  return null;
}

export async function saveNote(
  destinationId: string,
  type: "beach" | "mountain",
  content: string
): Promise<void> {
  try {
    const notes = await getNotes();
    const key = `${type}_${destinationId}`;
    const now = Date.now();

    if (content.trim()) {
      notes[key] = {
        id: key,
        destinationId,
        type,
        content: content.trim(),
        createdAt: notes[key]?.createdAt || now,
        updatedAt: now,
      };
    } else {
      delete notes[key];
    }

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving note:", error);
  }
}

export async function getFavorites(): Promise<Set<string>> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    if (data) {
      return new Set(JSON.parse(data));
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
  }
  return new Set();
}

export async function saveFavorites(favorites: Set<string>): Promise<void> {
  try {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(Array.from(favorites))
    );
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}

export async function toggleFavorite(
  destinationId: string,
  type: "beach" | "mountain"
): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const key = `${type}_${destinationId}`;

    if (favorites.has(key)) {
      favorites.delete(key);
      await saveFavorites(favorites);
      return false;
    } else {
      favorites.add(key);
      await saveFavorites(favorites);
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
  return false;
}

export async function isFavorite(
  destinationId: string,
  type: "beach" | "mountain"
): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const key = `${type}_${destinationId}`;
    return favorites.has(key);
  } catch (error) {
    console.error("Error checking favorite:", error);
  }
  return false;
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      VISITED_BEACHES_KEY,
      VISITED_MOUNTAINS_KEY,
      NOTES_KEY,
      FAVORITES_KEY,
    ]);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
