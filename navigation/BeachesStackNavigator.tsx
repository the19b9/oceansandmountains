import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeachesScreen from "@/screens/BeachesScreen";
import DestinationDetailScreen from "@/screens/DestinationDetailScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { Beach } from "@/data/destinations";

export type BeachesStackParamList = {
  Beaches: undefined;
  DestinationDetail: {
    destination: Beach;
    type: "beach";
  };
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
