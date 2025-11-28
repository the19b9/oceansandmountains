import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MountainsScreen from "@/screens/MountainsScreen";
import DestinationDetailScreen from "@/screens/DestinationDetailScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { Mountain } from "@/data/destinations";

export type MountainsStackParamList = {
  Mountains: undefined;
  DestinationDetail: {
    destination: Mountain;
    type: "mountain";
  };
};

const Stack = createNativeStackNavigator<MountainsStackParamList>();

export default function MountainsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Mountains"
        component={MountainsScreen}
        options={{
          headerTitle: "Mountains",
        }}
      />
      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.destination.name,
        })}
      />
    </Stack.Navigator>
  );
}
