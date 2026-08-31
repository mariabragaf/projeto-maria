import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
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

export default function FilmesListarScreen() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarFilmes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/filmes", {
        params: { limit: 50 },
      });

      setFilmes(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os filmes. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarFilmes();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Listar filmes</Text>
          <Text style={styles.subtitulo}>GET /api/filmes</Text>
        </View>

        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          filmes.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.categoria}>
                  {item.genero} · {item.diretor} · {item.ano}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor:  "#fbf6e5" 
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
    color: "#4A3840" 
  },
  subtitulo: { 
    fontSize: 14, 
    color: "#C96B88", 
    marginTop: 2 
  },
  erro: { 
    color:  "#C96B88", 
    marginTop: 12 
  },
  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: { 
    width: 64, 
    height: 64 
  },
  info: { 
    flex: 1, 
    justifyContent: "center", 
    paddingRight: 12 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: "700",
    color:"#4A3840"
  },
  categoria: { 
    fontSize: 13, 
    color: "#8A6D73" 
  },
});