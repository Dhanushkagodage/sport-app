import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = () => {
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
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

    if (!confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password",
      }));
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log("SignUp Successful");
      router.push(`/upcomingMatches?username=${name}`);
      //router.push(`/home?username=${name}`);
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
          Sign Up and Stay Ahead in the Game!
          </Text>
        </View>
        <View>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
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
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.inputbuttontext}>SIGN UP</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.signupText}>
            Already Have an Account?{" "}
              <Link href={"/signin"}>
                <Text style={styles.signupLink}>Sign In</Text>
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
    paddingTop:20,
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 30,
    
  },
  welcomeText: {
    color: "Black",
    fontSize: 17,
    paddingTop: 60,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#6D7361",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 35,
  },
  button: {
    height: 50,
    marginTop: 40,
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

export default Signup;
