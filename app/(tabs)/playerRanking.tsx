import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

const PlayerRanking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayerRanking = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
        "X-RapidAPI-Key": "9f034dd713msh91e35c75e92d1c5p1acc66jsnd5229d616376",
      },
    };

    try {
      const response = await fetch(
        "https://cricket-live-line1.p.rapidapi.com/playerRanking/1",
        options
      );
      const json = await response.json();
      if (json && json.data) {
        const rankedData = json.data.map((player: { rank: number }) => {
          const playerImage = players.find(
            (p) => p.rank === player.rank
          )?.player;
          return {
            ...player,
            playerImage,
          };
        });
        setData(rankedData);
      }
    } catch (error) {
      console.error("Error fetching player ranking:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerRanking();
  }, []);

  const players = [
    {
      rank: 1,
      player: require("../../assets/players/1.jpeg"),
    },
    {
      rank: 2,
      player: require("../../assets/players/2.jpeg"),
    },
    {
      rank: 3,
      player: require("../../assets/players/3.jpeg"),
    },
    {
      rank: 4,
      player: require("../../assets/players/4.jpeg"),
    },
    {
      rank: 5,
      player: require("../../assets/players/5.jpeg"),
    },
    {
      rank: 6,
      player: require("../../assets/players/6.jpeg"),
    },
    {
      rank: 7,
      player: require("../../assets/players/7.jpeg"),
    },
    {
      rank: 8,
      player: require("../../assets/players/8.jpeg"),
    },
    {
      rank: 9,
      player: require("../../assets/players/9.jpeg"),
    },
    {
      rank: 10,
      player: require("../../assets/players/10.jpeg"),
    },
  ];

  const renderPlayerCard = ({
    item,
  }: {
    item: {
      rank: number;
      playerImage: any;
      name: string;
      rating: number;
      country: string;
    };
  }) => {
    return (
      <View style={styles.card}>
        <View style={{ alignItems: "center", width: "10%" }}>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>Rank</Text>
          <Text style={styles.rank}>{item.rank}</Text>
        </View>

        <View style={styles.countryFlag}>
          <Image
            style={{ height: 50, width: 50, borderWidth: 1, borderRadius: 30 }}
            source={
              item.playerImage || require("../../assets/images/sportLogo.png")
            }
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.rating}>Country: {item.country}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Player Ranking</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={renderPlayerCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default PlayerRanking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DA47C14",
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA47C14",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "white",
  },
  countryFlag: {
    alignItems: "center",
    width: "30%",
  },
  rank: {
    fontSize: 22,
    fontWeight: "900",
    color: "#333",
  },
  detailsContainer: {
    justifyContent: "space-around",
    width: "60%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e90ff",
  },
  rating: {
    fontSize: 12,
    fontWeight: "400",
    color: "#555",
    marginRight: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
});
