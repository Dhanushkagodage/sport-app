import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

const TeamRanking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamRanking = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
        "X-RapidAPI-Key": "9f034dd713msh91e35c75e92d1c5p1acc66jsnd5229d616376",
      },
    };

    try {
      const response = await fetch(
        "https://cricket-live-line1.p.rapidapi.com/teamRanking/1",
        options
      );
      const json = await response.json();
      console.log(json);
      if (json && json.data) {
        setData(json.data);
      }
    } catch (error) {
      console.error("Error fetching team ranking:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamRanking();
  }, []);

  const flags = [
    {
      rank: 1,
      flag: require("../../assets/flags/IND.png"),
    },
    {
      rank: 2,
      flag: require("../../assets/flags/AUS.png"),
    },
    {
      rank: 3,
      flag: require("../../assets/flags/PAK.png"),
    },
    {
      rank: 4,
      flag: require("../../assets/flags/SA.png"),
    },
    {
      rank: 5,
      flag: require("../../assets/flags/NZ.png"),
    },
    {
      rank: 6,
      flag: require("../../assets/flags/SL.png"),
    },
    {
      rank: 7,
      flag: require("../../assets/flags/ENG.png"),
    },

    {
      rank: 8,
      flag: require("../../assets/flags/AFG.png"),
    },
    {
      rank: 9,
      flag: require("../../assets/flags/BAN.png"),
    },
    {
      rank: 10,
      flag: require("../../assets/flags/WI.png"),
    },
    {
      rank: 11,
      flag: require("../../assets/flags/IRE.png"),
    },
    {
      rank: 12,
      flag: require("../../assets/flags/ZIM.png"),
    },
    {
      rank: 13,
      flag: require("../../assets/flags/SCO.png"),
    },
    {
      rank: 14,
      flag: require("../../assets/flags/NED.png"),
    },
    {
      rank: 15,
      flag: require("../../assets/flags/CAN.png"),
    },
    {
      rank: 16,
      flag: require("../../assets/flags/USA.png"),
    },
    {
      rank: 17,
      flag: require("../../assets/flags/OMA.png"),
    },
    {
      rank: 18,
      flag: require("../../assets/flags/NEP.png"),
    },
    {
      rank: 19,
      flag: require("../../assets/flags/NAM.png"),
    },
    {
      rank: 20,
      flag: require("../../assets/flags/UAE.png"),
    },
  ];

  const renderTeamCard = ({
    item,
  }: {
    item: {
      point: number;
      rating: number;
      rank: number;
      team: string;
    };
  }) => {
    const flagImage = flags.find((flag) => flag.rank === item.rank)?.flag;

    return (
      <View style={styles.card}>
        <View style={{ alignItems: "center", width: "10%" }}>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>Rank</Text>
          <Text style={styles.rank}>{item.rank}</Text>
        </View>

        <View style={styles.team}>
          {flagImage ? (
            <Image
              style={{ height: 45, width: 65, borderWidth: 1 }}
              source={flagImage}
            />
          ) : (
            <Image
              style={{ height: 45, width: 60 }}
              source={require("../../assets/images/sportLogo.png")}
            />
          )}
        </View>
        <Text style={styles.teamName}>{item.team}</Text>
        <View style={{ justifyContent: "space-between", paddingBottom: 10 }}>
          <Text style={styles.details}>Points: {item.point}</Text>
          <Text style={styles.details}>Rating: {item.rating}</Text>
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
      <Text style={styles.header}>Team Ranking</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={renderTeamCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default TeamRanking;

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
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  team: {
    alignItems: "center",
    width: "28%",
    //paddingLeft:10,
  },
  rank: {
    fontSize: 22,
    fontWeight: "900",
    color: "#333",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e90ff",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  details: {
    fontSize: 12,
    fontWeight: "400",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
});
