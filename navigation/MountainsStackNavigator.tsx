import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MountainsScreen from "@/screens/MountainsScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type MountainsStackParamList = {
  Mountains: undefined;
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
    </Stack.Navigator>
  );
}
