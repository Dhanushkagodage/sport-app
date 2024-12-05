import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    setErrors({ username: "", password: "" });

    let isValid = true;
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (isValid) {
      router.push(`/upcomingMatches?username=${username}`);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={styles.Logo}
            source={require("../../assets/images/sportLogo.png")}
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>
            Welcome to Cricbuzz - Your Cricket World Awaits!
          </Text>
        </View>
        <View>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} 
         // onPress={handleLogin}
          onPress={() => router.push(`/upcomingMatches`)}
          >
            <Text style={styles.inputbuttontext}>LOGIN</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.signupText}>
              Don't You Have an Account?{" "}
              <Link href={"/signup"}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 30,
  },
  welcomeText: {
    color: "Black",
    fontSize: 17,
    paddingTop: 80,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#6D7361",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  button: {
    height: 50,
    marginTop: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  inputbuttontext: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  Logo: {
    height: 60,
    objectFit: "contain",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: -20, 
    left: 10, 
  },
  signupText: {
    fontSize: 11,
    paddingTop: 10,
    textAlign: "center",
  },
  signupLink: {
    color: "#0482d7",
    fontWeight: "bold",
  },
});

export default Signin;
