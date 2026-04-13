import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
import { View, Text, StyleSheet } from "react-native";

function TabIcon({
  emoji,
  label,
  focused,
}: {
  emoji: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.iconWrapper}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, focused && styles.active]}>{label}</Text>
    </View>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.1);

  const startApp = () => {
    setIsReady(true);

    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });
  };

  const appStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  // if (!isReady) {
  //   return <SplashScreen onFinish={startApp} />;
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={[{ flex: 1 }, appStyle]}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                borderTopWidth: 0.5,
                borderTopColor: "#D3D1C7",
                backgroundColor: "white",
                height: 64,
              },
            }}
          >
            <Tab.Screen
              name="Aylık"
              component={CalendarScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon emoji="🗺️" label="Aylık" focused={focused} />
                ),
              }}
            />

            <Tab.Screen
              name="Daily"
              component={DailyScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon emoji="📋" label="Günlük" focused={focused} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  emoji: { fontSize: 18, marginTop: 4 },
  label: { fontSize: 10, color: "#888780", marginTop: 5 },
  active: { color: "#1D9E75", fontWeight: "600" },
});
