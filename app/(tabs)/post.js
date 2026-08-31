import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


const API_KEY = "cv_VSbGAz9HT0g04ho5ZbxOq2b3ZYjWlyI9uXpLn63vAiJk8bMcvQQ2HfkcIGzUTS2P";


const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function HeroisCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [poder, setPoder] = useState("");
  const [universo, setUniverso] = useState("");
  const [fraqueza, setFraqueza] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarHeroi() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/herois", {
        title: titulo,
        imageUrl: imagemUrl,
        poder,
        universo,
        fraqueza,
      });

      Alert.alert("Herói criado!", resposta.data.title);
      setTitulo("");
      setImagemUrl("");
      setPoder("");
      setUniverso("");
      setFraqueza("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o herói",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar herói</Text>
          <Text style={styles.subtitulo}>POST /api/herois</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Batman"
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/batman.jpg"
        />

        <Text style={styles.secao}>Campos específicos do tema heróis</Text>

        <Text style={styles.rotulo}>Poder</Text>
        <TextInput
          style={styles.campo}
          value={poder}
          onChangeText={setPoder}
          placeholder="Ex: Inteligência e estratégia"
        />

        <Text style={styles.rotulo}>Universo</Text>
        <TextInput
          style={styles.campo}
          value={universo}
          onChangeText={setUniverso}
          placeholder="Ex: DC"
        />

        <Text style={styles.rotulo}>Fraqueza</Text>
        <TextInput
          style={styles.campo}
          value={fraqueza}
          onChangeText={setFraqueza}
          placeholder="Ex: Humano sem poderes"
        />

        <Pressable style={styles.botao} onPress={criarHeroi} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar herói"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#e8bfff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#4e2466" },
  subtitulo: { fontSize: 14, color: "#4e2466", marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4e2466",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#faf3fe", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#4e2466",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#4e2466",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});