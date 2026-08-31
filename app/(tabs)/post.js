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

export default function FilmesCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [diretor, setDiretor] = useState("");
  const [ano, setAno] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarFilme() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/filmes", {
        title: titulo,
        imageUrl: imagemUrl,
        genero,
        diretor,
        ano,
      });

      Alert.alert("Filme criado!", resposta.data.title);
      setTitulo("");
      setImagemUrl("");
      setGenero("");
      setDiretor("");
      setAno("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o filme",
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
          <Text style={styles.tituloPagina}>Criar filme</Text>
          <Text style={styles.subtitulo}>POST /api/filmes</Text>
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

        <Text style={styles.secao}>Campos específicos do tema filmes</Text>

        <Text style={styles.rotulo}>Gênero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Ação"
        />

        <Text style={styles.rotulo}>Diretor</Text>
        <TextInput
          style={styles.campo}
          value={diretor}
          onChangeText={setDiretor}
          placeholder="Ex: Christopher Nolan"
        />

        <Text style={styles.rotulo}>Ano</Text>
        <TextInput
          style={styles.campo}
          value={ano}
          onChangeText={setAno}
          placeholder="Ex: 2020"
        />

        <Pressable style={styles.botao} onPress={criarFilme} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar filme"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#e8bfff" 
},
  conteudo: { 
    padding: 24, 
    paddingBottom: 48 
  },
  header: { 
    marginBottom: 16 
},
  tituloPagina: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#4e2466" 
},
  subtitulo: { 
    fontSize: 14, 
    color: "#4e2466", 
    marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4e2466",
    marginTop: 8,
    marginBottom: 8,
  },
  rotulo: { 
    fontSize: 13, 
    fontWeight: "600", 
    color: "#faf3fe", 
    marginBottom: 4 
},
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