import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenFlatList } from "@/components/ScreenFlatList";
import { SearchBar } from "@/components/SearchBar";
import { FilterChip } from "@/components/FilterChip";
import { DestinationCard } from "@/components/DestinationCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import {
  BEACHES,
  BEACH_REGIONS,
  BEACH_STATES,
  Beach,
  Region,
  State,
} from "@/data/destinations";
import { getVisitedBeaches, saveVisitedBeaches } from "@/utils/storage";
import { BeachesStackParamList } from "@/navigation/BeachesStackNavigator";

type FilterType = "All" | Region | State;
type NavigationProp = NativeStackNavigationProp<BeachesStackParamList, "Beaches">;

export default function BeachesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [visitedBeaches, setVisitedBeaches] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadVisitedBeaches();
    }, [])
  );

  const loadVisitedBeaches = async () => {
    const visited = await getVisitedBeaches();
    setVisitedBeaches(visited);
    setLoading(false);
  };

  const toggleVisited = useCallback(async (beachId: string) => {
    setVisitedBeaches((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(beachId)) {
        newSet.delete(beachId);
      } else {
        newSet.add(beachId);
      }
      saveVisitedBeaches(newSet);
      return newSet;
    });
  }, []);

  const navigateToDetail = useCallback(
    (beach: Beach) => {
      navigation.navigate("DestinationDetail", {
        destination: beach,
        type: "beach",
      });
    },
    [navigation]
  );

  const filters: FilterType[] = useMemo(
    () => ["All", ...BEACH_REGIONS, ...BEACH_STATES],
    []
  );

  const filteredBeaches = useMemo(() => {
    let result = BEACHES;

    if (activeFilter !== "All") {
      result = result.filter(
        (beach) =>
          beach.region === activeFilter || beach.state === activeFilter
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (beach) =>
          beach.name.toLowerCase().includes(query) ||
          beach.state.toLowerCase().includes(query) ||
          beach.region.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  const renderBeach = useCallback(
    ({ item }: { item: Beach }) => (
      <DestinationCard
        name={item.name}
        state={item.state}
        region={item.region}
        visited={visitedBeaches.has(item.id)}
        onToggleVisited={() => toggleVisited(item.id)}
        onPress={() => navigateToDetail(item)}
      />
    ),
    [visitedBeaches, toggleVisited, navigateToDetail]
  );

  const renderHeader = useCallback(
    () => (
      <View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search beaches..."
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
        <View style={styles.countRow}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {filteredBeaches.length} beaches
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.success }}>
            {visitedBeaches.size} visited
          </ThemedText>
        </View>
      </View>
    ),
    [searchQuery, activeFilter, filters, filteredBeaches.length, visitedBeaches.size, theme]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          No beaches found
        </ThemedText>
      </View>
    ),
    [theme]
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundRoot }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScreenFlatList
      data={filteredBeaches}
      renderItem={renderBeach}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterScroll: {
    marginHorizontal: -Spacing.xl,
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.xl,
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    paddingVertical: Spacing["4xl"],
    alignItems: "center",
  },
});
