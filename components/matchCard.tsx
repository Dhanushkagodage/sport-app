import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Match } from "../types/match";
import { useHeart } from "@/context/HeartContext";

const MatchCard = ({ match }: { match: Match }) => {
  const [isAdded, setIsAdded] = useState(false);

  const heartContext = useHeart();

  const { incrementHeartCount, decrementHeartCount } = heartContext;

  const toggleHeart = () => {
    if (isAdded) {
      decrementHeartCount();
      setIsAdded(false);
    } else {
      incrementHeartCount();
      setIsAdded(true);
    }
  };

  return (
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
      <View style={styles.footer}>
        <View>
          <Text style={styles.boldText}>Starts at {match.match_time}</Text>
          <Text style={styles.venueText} ellipsizeMode="tail">
            <Text style={styles.boldText}>Venue:</Text>{" "}
            <Text style={styles.venueHighlight} >
              {match.venue}
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={toggleHeart}>
          <Image
            source={
              isAdded
                ? require("../assets/icons/heart-green.png")
                : require("../assets/icons/heart.png")
            }
            style={styles.heartImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  matchDate: {
    fontSize: 11,
    marginBottom: 15,
    fontWeight: "400",
    textAlign: "right",
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  matchMatches: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1DA47C",
    marginBottom: 5,
    paddingLeft: 10,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingHorizontal:5
  },
  boldText: {
    fontSize: 11,
    color: "black",
  },
  venueText: {
    fontSize: 12,
    justifyContent:"space-between"
  },
  venueHighlight: {
    color: "#0277BD",
    overflow: "hidden",
  },
  heartImage: {
    width: 23,
    height: 23,
  },
});

export default MatchCard;
