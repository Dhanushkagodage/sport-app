import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";

interface Match {
  team_b_id: number;
  date_wise: string;
  max_rate: string;
  match_id: number;
  venue: string;
  match_status: string;
  matchs: string;
  venue_id: number;
  series: string;
  team_a_id: number;
  match_date: string;
  team_a_img: string;
  min_rate: string;
  match_time: string;
  match_type: string;
  team_b_img: string;
  team_b_short: string;
  team_b: string;
  team_a_short: string;
  fav_team: string;
  team_a: string;
  is_hundred: number;
  series_id: number;
  series_type: string;
}

const MatchCard = ({ match }: { match: Match }) => (
  <View style={styles.matchCard}>
    <Text style={styles.matchDate}>{match.date_wise}</Text>
    <Text style={styles.matchTitle}>{match.series}</Text>
    <Text style={styles.matchMatches}>{match.matchs}</Text>
    <View style={styles.teamSection}>
      <View style={styles.team}>
        <Image source={{ uri: match.team_a_img }} style={styles.teamImage} />
        <Text>{match.team_a_short}</Text>
      </View>
      <Text style={styles.vs}>VS</Text>
      <View style={styles.team}>
        <Image source={{ uri: match.team_b_img }} style={styles.teamImage} />
        <Text>{match.team_b_short}</Text>
      </View>
    </View>
    <Text style={styles.boldText}>Starts at {match.match_time}</Text>
    <Text style={{ fontSize: 12, paddingLeft: 10 }}>
      <Text style={styles.boldText}>Venue:</Text> <Text style={{ color: "#0277BD" }}> {match.venue}</Text>
    </Text>
  </View>
);

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "",
          //"https://cricket-live-line1.p.rapidapi.com/upcomingMatches",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "9f034dd713msh91e35c75e92d1c5p1acc66jsnd5229d616376",
              "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
            },
          }
        );
        const json = await response.json();
        console.log(json);
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
      <Text style={styles.header}>Upcoming Matches</Text>
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
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  matchMatches: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1DA47C",
    marginBottom: 5,
    paddingLeft: 10,
  },
  matchDate: {
    fontSize: 11,
    marginBottom: 15,
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "400",
    textAlign: "right",
  },
  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  boldText: {
    paddingLeft: 10,
    fontSize: 11,
    color: "black",
  },
  teamSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  team: {
    alignItems: "center",
    width: "40%",
  },
  teamImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    resizeMode: "contain",
  },
  vs: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA47C14",
  },
});
