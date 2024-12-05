import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      </Stack>
      
   
  );
}

const styles = StyleSheet.create({})