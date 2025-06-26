import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    // style= {styles.Tabs}
      screenOptions={{
        tabBarActiveTintColor: '#fd9489',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          color: '#ffffff', // Custom text color (e.g., Blue)
          fontSize: 12, // Optional: Adjust font size
        },

        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: '#2694a9',
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    
    </Tabs>
    
  );
  
}
const styles = StyleSheet.create({
  Tabs:{
    backgroundColor: '#b9dee4',
    
  }
});