import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { ScreenFlatList } from "@/components/ScreenFlatList";
import { SearchBar } from "@/components/SearchBar";
import { FilterChip } from "@/components/FilterChip";
import { DestinationCard } from "@/components/DestinationCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import {
  MOUNTAINS,
  MOUNTAIN_REGIONS,
  MOUNTAIN_STATES,
  Mountain,
  Region,
  State,
} from "@/data/destinations";
import { getVisitedMountains, saveVisitedMountains } from "@/utils/storage";

type FilterType = "All" | Region | State;

export default function MountainsScreen() {
  const { theme } = useTheme();
  const [visitedMountains, setVisitedMountains] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisitedMountains();
  }, []);

  const loadVisitedMountains = async () => {
    const visited = await getVisitedMountains();
    setVisitedMountains(visited);
    setLoading(false);
  };

  const toggleVisited = useCallback(async (mountainId: string) => {
    setVisitedMountains((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mountainId)) {
        newSet.delete(mountainId);
      } else {
        newSet.add(mountainId);
      }
      saveVisitedMountains(newSet);
      return newSet;
    });
  }, []);

  const filters: FilterType[] = useMemo(
    () => ["All", ...MOUNTAIN_REGIONS, ...MOUNTAIN_STATES],
    []
  );

  const filteredMountains = useMemo(() => {
    let result = MOUNTAINS;

    if (activeFilter !== "All") {
      result = result.filter(
        (mountain) =>
          mountain.region === activeFilter || mountain.state === activeFilter
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (mountain) =>
          mountain.name.toLowerCase().includes(query) ||
          mountain.state.toLowerCase().includes(query) ||
          mountain.region.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  const renderMountain = useCallback(
    ({ item }: { item: Mountain }) => (
      <DestinationCard
        name={item.name}
        state={item.state}
        region={item.region}
        altitude={item.altitude}
        visited={visitedMountains.has(item.id)}
        onToggleVisited={() => toggleVisited(item.id)}
      />
    ),
    [visitedMountains, toggleVisited]
  );

  const renderHeader = useCallback(
    () => (
      <View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search mountains & treks..."
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
            {filteredMountains.length} treks
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.success }}>
            {visitedMountains.size} completed
          </ThemedText>
        </View>
      </View>
    ),
    [searchQuery, activeFilter, filters, filteredMountains.length, visitedMountains.size, theme]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          No mountains found
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
      data={filteredMountains}
      renderItem={renderMountain}
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
