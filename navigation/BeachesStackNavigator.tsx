import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeachesScreen from "@/screens/BeachesScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type BeachesStackParamList = {
  Beaches: undefined;
};

const Stack = createNativeStackNavigator<BeachesStackParamList>();

export default function BeachesStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Beaches"
        component={BeachesScreen}
        options={{
          headerTitle: () => <HeaderTitle title="India Explorer" />,
        }}
      />
    </Stack.Navigator>
  );
}
