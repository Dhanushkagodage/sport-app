import React from "react";
import { Tabs ,useLocalSearchParams  } from "expo-router";
import { Image, View, StyleSheet, Text } from "react-native";

const PlaceholderIcon = ({
  source,
  color,
  focused,
}: {
  source: any;
  color: string;
  focused: boolean;
}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={source}
        style={[
          styles.iconImage,
          {
            tintColor: color,
            width: focused ? 28 : 25,
            height: focused ? 28 : 25,
          }, 
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const TabLayout = () => {

  const { username } = useLocalSearchParams();
  const usernameStr = Array.isArray(username) ? username[0] : username;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1DA47C",
          height: 50,
          elevation: 5,
          shadowColor: "#0000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="upcomingMatches"
        options={{
          header: () => <CustomHeader username={usernameStr} />,
          tabBarIcon: ({ color, focused }) => (
            <PlaceholderIcon
              source={require("../../assets/icons/upcoming_matches.png")}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="teamRanking"
        options={{
          header: () => <CustomHeader username={usernameStr}/>,
          tabBarIcon: ({ color, focused }) => (
            <PlaceholderIcon
              source={require("../../assets/icons/team_rank.png")}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playerRanking"
        options={{
          title: "Player Ranking",
          header: () => <CustomHeader username={usernameStr}/>,
          tabBarIcon: ({ color, focused }) => (
            <PlaceholderIcon
              source={require("../../assets/icons/player_rank.png")}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default TabLayout;

const CustomHeader = ({ username }: { username: string }) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.header1}>
        <Image
          style={headerStyles.logo}
          source={require("../../assets/images/sportLogo2.png")}
          resizeMode="contain"
        />
        <View style={headerStyles.avatarContainer}>
          <Image
            style={headerStyles.avatarImage}
            source={require("../../assets/images/avatar.png")}
            resizeMode="cover"
          />
        </View>
      </View>
      <View>
        <Text style={headerStyles.header2}>Welcome back,{username ? ` ${username}` : ""} 👋</Text>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1DA47C",
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 1000,
  },

  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  header2: {
    textAlign: "left",
    color: "#adedd1",
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 18,
    marginTop: 10,
  },

  logo: {
    width: 120,
    height: 50,
  },

  avatarContainer: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatarText: {
    color: "#2a2a2a",
    fontSize: 18,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
