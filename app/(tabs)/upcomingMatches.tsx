import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import MatchCard from "../../components/matchCard";
import { Match } from "../../types/match";
import { useHeart } from "@/context/HeartContext";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const heartContext = useHeart();

  const { heartCount } = heartContext;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          // "",
          "https://cricket-live-line1.p.rapidapi.com/upcomingMatches",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "a13bc60571msh6710c4d2fe09e25p1b835fjsn78671edb68f1",
              "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
            },
          }
        );
        const json = await response.json();
        if (json.status) {
          setMatches(json.data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Upcoming Matches</Text>
        <View style={styles.favoriteCountContainer}>
          <Text style={styles.favoriteCountText}>My Favorites :</Text>
          <View style={styles.favoriteCount}>
            <Image
              source={require("../../assets/icons/heart-green.png")}
              style={styles.image}
            />
            <Text style={styles.favoriteText}>{heartCount}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.match_id.toString()}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DA47C14",
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  favoriteCount: {
    
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCountText:{
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  favoriteCountContainer:{
    backgroundColor: "#1DA47C18",
    paddingHorizontal: 10,
    
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  favoriteText: {
    color: "#1DA47C",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 24,
  },

  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA47C14",
  },
  image: {
    width: 23,
    height: 23,
  },
});
