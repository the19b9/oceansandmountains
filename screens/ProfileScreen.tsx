import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { AvatarSelector } from "@/components/AvatarSelector";
import { StatCard } from "@/components/StatCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { BEACHES, MOUNTAINS, Beach, Mountain } from "@/data/destinations";
import {
  getVisitedBeaches,
  getVisitedMountains,
  getUserProfile,
  saveUserProfile,
  clearAllData,
  getFavorites,
  UserProfile,
} from "@/utils/storage";

interface FavoriteItem {
  destination: Beach | Mountain;
  type: "beach" | "mountain";
  key: string;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Traveler",
    avatarIndex: 0,
  });
  const [visitedBeachesCount, setVisitedBeachesCount] = useState(0);
  const [visitedMountainsCount, setVisitedMountainsCount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [userProfile, visitedBeaches, visitedMountains, favoritesSet] =
      await Promise.all([
        getUserProfile(),
        getVisitedBeaches(),
        getVisitedMountains(),
        getFavorites(),
      ]);
    setProfile(userProfile);
    setNameInput(userProfile.name);
    setVisitedBeachesCount(visitedBeaches.size);
    setVisitedMountainsCount(visitedMountains.size);

    const favoriteItems: FavoriteItem[] = [];
    favoritesSet.forEach((key) => {
      const [type, id] = key.split("_");
      if (type === "beach") {
        const beach = BEACHES.find((b) => b.id === id);
        if (beach) {
          favoriteItems.push({ destination: beach, type: "beach", key });
        }
      } else if (type === "mountain") {
        const mountain = MOUNTAINS.find((m) => m.id === id);
        if (mountain) {
          favoriteItems.push({ destination: mountain, type: "mountain", key });
        }
      }
    });
    setFavorites(favoriteItems);
  };

  const handleAvatarSelect = async (index: number) => {
    const newProfile = { ...profile, avatarIndex: index };
    setProfile(newProfile);
    await saveUserProfile(newProfile);
  };

  const handleNameSave = async () => {
    if (nameInput.trim()) {
      const newProfile = { ...profile, name: nameInput.trim() };
      setProfile(newProfile);
      await saveUserProfile(newProfile);
    }
  };

  const handleClearProgress = () => {
    Alert.alert(
      "Clear All Progress",
      "This will reset all your visited beaches, mountains, and favorites. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearAllData();
            setVisitedBeachesCount(0);
            setVisitedMountainsCount(0);
            setFavorites([]);
          },
        },
      ]
    );
  };

  const navigateToDetail = (item: FavoriteItem) => {
    const targetTab = item.type === "beach" ? "BeachesTab" : "MountainsTab";
    (navigation as any).navigate(targetTab, {
      screen: "DestinationDetail",
      params: {
        destination: item.destination,
        type: item.type,
      },
    });
  };

  const renderFavoriteItem = ({ item }: { item: FavoriteItem }) => (
    <Pressable
      onPress={() => navigateToDetail(item)}
      style={({ pressed }) => [
        styles.favoriteCard,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.favoriteContent}>
        <Feather
          name={item.type === "beach" ? "sun" : "triangle"}
          size={16}
          color={item.type === "beach" ? theme.primary : theme.secondary}
        />
        <View style={styles.favoriteText}>
          <ThemedText type="body" style={{ fontWeight: "500" }}>
            {item.destination.name}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.destination.state}
          </ThemedText>
        </View>
      </View>
      <Feather name="chevron-right" size={18} color={theme.textSecondary} />
    </Pressable>
  );

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Choose Your Avatar
        </ThemedText>
        <AvatarSelector
          selectedIndex={profile.avatarIndex}
          onSelect={handleAvatarSelect}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Your Name
        </ThemedText>
        <View style={styles.nameInputRow}>
          <TextInput
            style={[
              styles.nameInput,
              {
                backgroundColor: theme.backgroundDefault,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={nameInput}
            onChangeText={setNameInput}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            onBlur={handleNameSave}
            returnKeyType="done"
            onSubmitEditing={handleNameSave}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Travel Progress
        </ThemedText>
        <StatCard
          title="Beaches Visited"
          visited={visitedBeachesCount}
          total={BEACHES.length}
          icon="sun"
          color={theme.primary}
        />
        <StatCard
          title="Mountains Conquered"
          visited={visitedMountainsCount}
          total={MOUNTAINS.length}
          icon="triangle"
          color={theme.secondary}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Bucket List
          </ThemedText>
          <View style={styles.favoriteCount}>
            <Feather name="heart" size={14} color="#EF4444" />
            <ThemedText type="small" style={{ marginLeft: Spacing.xs }}>
              {favorites.length}
            </ThemedText>
          </View>
        </View>
        {favorites.length > 0 ? (
          <View style={styles.favoritesContainer}>
            {favorites.map((item) => (
              <View key={item.key}>
                {renderFavoriteItem({ item })}
              </View>
            ))}
          </View>
        ) : (
          <View
            style={[
              styles.emptyFavorites,
              { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
            ]}
          >
            <Feather name="heart" size={32} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={[styles.emptyText, { color: theme.textSecondary }]}
            >
              No favorites yet
            </ThemedText>
            <ThemedText
              type="small"
              style={[styles.emptyHint, { color: theme.textSecondary }]}
            >
              Tap the heart icon on any destination to add it to your bucket list
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Settings
        </ThemedText>
        <Pressable
          onPress={handleClearProgress}
          style={({ pressed }) => [
            styles.dangerButton,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: "#EF4444",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText type="body" style={styles.dangerButtonText}>
            Clear All Progress
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <ThemedText
          type="small"
          style={[styles.footerText, { color: theme.textSecondary }]}
        >
          India Explorer v1.0
        </ThemedText>
        <ThemedText
          type="small"
          style={[styles.footerText, { color: theme.textSecondary }]}
        >
          Track your adventures across India
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  favoriteCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameInput: {
    flex: 1,
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
  },
  favoritesContainer: {
    gap: Spacing.sm,
  },
  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  favoriteContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  favoriteText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  emptyFavorites: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: Spacing.md,
    fontWeight: "500",
  },
  emptyHint: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  dangerButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerButtonText: {
    color: "#EF4444",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingTop: Spacing["2xl"],
    paddingBottom: Spacing.xl,
  },
  footerText: {
    marginBottom: Spacing.xs,
  },
});
