import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, TextInput, Alert, Keyboard } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Beach, Mountain } from "@/data/destinations";
import {
  getBeachDetails,
  getMountainDetails,
  DestinationDetails,
} from "@/data/destinationDetails";
import {
  getVisitedBeaches,
  getVisitedMountains,
  saveVisitedBeaches,
  saveVisitedMountains,
  getNote,
  saveNote,
  isFavorite,
  toggleFavorite,
} from "@/utils/storage";

type DestinationDetailParams = {
  DestinationDetail: {
    destination: Beach | Mountain;
    type: "beach" | "mountain";
  };
};

export default function DestinationDetailScreen() {
  const { theme } = useTheme();
  const route = useRoute<RouteProp<DestinationDetailParams, "DestinationDetail">>();
  const { destination, type } = route.params;
  const [visited, setVisited] = useState(false);
  const [details, setDetails] = useState<DestinationDetails | null>(null);
  const [note, setNote] = useState("");
  const [originalNote, setOriginalNote] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  useEffect(() => {
    loadData();
  }, [destination.id, type]);

  const loadData = async () => {
    const detailsData =
      type === "beach"
        ? getBeachDetails(destination.id)
        : getMountainDetails(destination.id);
    setDetails(detailsData);

    const visitedSet =
      type === "beach" ? await getVisitedBeaches() : await getVisitedMountains();
    setVisited(visitedSet.has(destination.id));

    const noteData = await getNote(destination.id, type);
    if (noteData) {
      setNote(noteData.content);
      setOriginalNote(noteData.content);
    }

    const isFav = await isFavorite(destination.id, type);
    setFavorite(isFav);
  };

  const toggleVisited = useCallback(async () => {
    const getVisited = type === "beach" ? getVisitedBeaches : getVisitedMountains;
    const saveVisited = type === "beach" ? saveVisitedBeaches : saveVisitedMountains;

    const visitedSet = await getVisited();
    if (visitedSet.has(destination.id)) {
      visitedSet.delete(destination.id);
      setVisited(false);
    } else {
      visitedSet.add(destination.id);
      setVisited(true);
    }
    await saveVisited(visitedSet);
  }, [destination.id, type]);

  const handleToggleFavorite = useCallback(async () => {
    const newState = await toggleFavorite(destination.id, type);
    setFavorite(newState);
  }, [destination.id, type]);

  const handleSaveNote = useCallback(async () => {
    await saveNote(destination.id, type, note);
    setOriginalNote(note);
    setIsEditingNote(false);
    Keyboard.dismiss();
  }, [destination.id, type, note]);

  const handleCancelNote = useCallback(() => {
    setNote(originalNote);
    setIsEditingNote(false);
    Keyboard.dismiss();
  }, [originalNote]);

  const handleDeleteNote = useCallback(() => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setNote("");
            await saveNote(destination.id, type, "");
            setOriginalNote("");
            setIsEditingNote(false);
          },
        },
      ]
    );
  }, [destination.id, type]);

  const mountain = destination as Mountain;

  return (
    <ScreenScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <ThemedText type="h3" style={styles.title}>
            {destination.name}
          </ThemedText>
          <Pressable
            onPress={handleToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Feather
              name={favorite ? "heart" : "heart"}
              size={24}
              color={favorite ? "#EF4444" : theme.textSecondary}
              style={{ opacity: favorite ? 1 : 0.5 }}
            />
          </Pressable>
        </View>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color={theme.textSecondary} />
          <ThemedText
            type="small"
            style={[styles.location, { color: theme.textSecondary }]}
          >
            {destination.state}
          </ThemedText>
          <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
          <ThemedText
            type="small"
            style={[styles.location, { color: theme.textSecondary }]}
          >
            {destination.region}
          </ThemedText>
        </View>
        {mountain.altitude ? (
          <View style={styles.altitudeRow}>
            <Feather name="trending-up" size={14} color={theme.secondary} />
            <ThemedText
              type="small"
              style={[styles.altitude, { color: theme.secondary }]}
            >
              {mountain.altitude}
            </ThemedText>
          </View>
        ) : null}
      </View>

      <Pressable
        onPress={toggleVisited}
        style={({ pressed }) => [
          styles.visitedCard,
          {
            backgroundColor: visited ? theme.success + "15" : theme.backgroundDefault,
            borderColor: visited ? theme.success : theme.border,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <View style={styles.visitedContent}>
          <Feather
            name={visited ? "check-circle" : "circle"}
            size={24}
            color={visited ? theme.success : theme.textSecondary}
          />
          <View style={styles.visitedText}>
            <ThemedText type="body" style={{ fontWeight: "600" }}>
              {visited ? "Visited" : "Not visited yet"}
            </ThemedText>
            <ThemedText
              type="small"
              style={{ color: theme.textSecondary }}
            >
              {visited
                ? "Tap to remove from visited"
                : "Tap to mark as visited"}
            </ThemedText>
          </View>
        </View>
      </Pressable>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Travel Notes
          </ThemedText>
          {note.trim() && !isEditingNote ? (
            <View style={styles.noteActions}>
              <Pressable
                onPress={() => setIsEditingNote(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, marginRight: Spacing.md }]}
              >
                <Feather name="edit-2" size={18} color={theme.primary} />
              </Pressable>
              <Pressable
                onPress={handleDeleteNote}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Feather name="trash-2" size={18} color="#EF4444" />
              </Pressable>
            </View>
          ) : null}
        </View>
        {isEditingNote || !note.trim() ? (
          <View>
            <TextInput
              style={[
                styles.noteInput,
                {
                  backgroundColor: theme.backgroundDefault,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              value={note}
              onChangeText={setNote}
              placeholder="Add your travel memories, tips, or thoughts..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={() => setIsEditingNote(true)}
            />
            {isEditingNote ? (
              <View style={styles.noteButtonRow}>
                <Pressable
                  onPress={handleCancelNote}
                  style={({ pressed }) => [
                    styles.noteButton,
                    {
                      backgroundColor: theme.backgroundSecondary,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <ThemedText type="small" style={{ fontWeight: "600" }}>
                    Cancel
                  </ThemedText>
                </Pressable>
                <Pressable
                  onPress={handleSaveNote}
                  style={({ pressed }) => [
                    styles.noteButton,
                    {
                      backgroundColor: theme.primary,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <ThemedText
                    type="small"
                    style={{ fontWeight: "600", color: "#FFFFFF" }}
                  >
                    Save Note
                  </ThemedText>
                </Pressable>
              </View>
            ) : null}
          </View>
        ) : (
          <View
            style={[
              styles.savedNote,
              { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
            ]}
          >
            <ThemedText type="body" style={styles.noteText}>
              {note}
            </ThemedText>
          </View>
        )}
      </View>

      {details ? (
        <>
          <View style={styles.section}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              About
            </ThemedText>
            <ThemedText type="body" style={styles.description}>
              {details.description}
            </ThemedText>
          </View>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
            ]}
          >
            <Feather name="calendar" size={20} color={theme.primary} />
            <View style={styles.infoContent}>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Best time to visit
              </ThemedText>
              <ThemedText type="body" style={{ fontWeight: "500" }}>
                {details.bestTimeToVisit}
              </ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Travel Tips
            </ThemedText>
            {details.tips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <View style={[styles.tipBullet, { backgroundColor: theme.primary }]} />
                <ThemedText type="body" style={styles.tipText}>
                  {tip}
                </ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Nearby Attractions
            </ThemedText>
            <View style={styles.attractionsContainer}>
              {details.nearbyAttractions.map((attraction, index) => (
                <View
                  key={index}
                  style={[
                    styles.attractionTag,
                    { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
                  ]}
                >
                  <Feather name="map-pin" size={12} color={theme.primary} />
                  <ThemedText type="small" style={styles.attractionText}>
                    {attraction}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <View style={styles.section}>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            Detailed information coming soon...
          </ThemedText>
        </View>
      )}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  title: {
    flex: 1,
    marginRight: Spacing.md,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  location: {
    marginLeft: Spacing.xs,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
  altitudeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  altitude: {
    marginLeft: Spacing.xs,
    fontWeight: "600",
  },
  visitedCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  visitedContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  visitedText: {
    marginLeft: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  noteActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    padding: Spacing.md,
    fontSize: 16,
    minHeight: 120,
  },
  noteButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  noteButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xs,
  },
  savedNote: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
  },
  noteText: {
    lineHeight: 22,
  },
  description: {
    lineHeight: 24,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  infoContent: {
    marginLeft: Spacing.md,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: Spacing.md,
  },
  tipText: {
    flex: 1,
    lineHeight: 22,
  },
  attractionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  attractionTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  attractionText: {
    marginLeft: Spacing.xs,
  },
});
