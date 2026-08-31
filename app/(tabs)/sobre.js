import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const codeverseLogo = require("../../assets/maria.jpg");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={codeverseLogo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Maria Eduarda Braga Ferreira</Text>
          <Text style={styles.description}>
            Estudante de Desenvolvimento de Software, apaixonada por criar experiências digitais através de código, do front-end ao mobile.
          </Text>
        </View>

        <View style={styles.card1}>
          <Text style={styles.cardTitle}>Habilidades</Text>
          <Text style={styles.cardItem}>• HTML</Text>
          <Text style={styles.cardItem}>• CSS</Text>
          <Text style={styles.cardItem}>• JavaScript</Text>
          <Text style={styles.cardItem}>• React Native</Text>
        </View>

         <View style={styles.card2}>
          <Text style={styles.cardTitle}>Contato</Text>
          <Text style={styles.cardItem}>• GitHub: mariabragaf</Text>
          <Text style={styles.cardItem}>• Email: maria.e.ferreira77@aluno.senai.br</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e8bfff",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 100,
    borderRadius: 24,
    backgroundColor: "#bb6be9",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 15,
    borderRadius: 150,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#4d1e68",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4d1e68",
    textAlign: "center",
  },
  card1: {
    gap: 8,
    padding: 50,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  card2: {
    gap: 8,
    padding: 50,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#bb6be9",
  },
  cardItem: {
    fontSize: 15,
    color: "#0a0a0a",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#733b94",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
