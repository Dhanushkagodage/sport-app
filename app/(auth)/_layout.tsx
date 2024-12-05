import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router';
import React from 'react'

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({})