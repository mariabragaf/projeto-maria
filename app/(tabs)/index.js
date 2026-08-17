import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const minhaFoto = require("../../assets/maria.jpg");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={minhaFoto}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>Maria Eduarda</Text>
          <Text style={styles.title}>Dev Junior</Text>
          <Text style={styles.description}>
            Estrutura pronta para o aluno focar em componentes, navegação e
            lógica de negócio desde a primeira aula.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que vem configurado</Text>
          <Text style={styles.cardItem}>• JavaScript habilitado</Text>
          <Text style={styles.cardItem}>• Rotas com expo-router</Text>
          <Text style={styles.cardItem}>• Abas e modal de exemplo</Text>
          <Text style={styles.cardItem}>• Scripts para Android, iOS e Web</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e9c4ff",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#bb6be9",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 70,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#f7e9ff",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#8e42b9",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#f7e9ff",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#f7e9ff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8e42b9",
  },
  cardItem: {
    fontSize: 15,
    color: "#26083b",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#bb6be9",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e0b4fa",
  },
});
