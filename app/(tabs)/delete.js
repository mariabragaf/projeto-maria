import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    Alert,
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


export default function FilmesExcluirScreen() {
    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [excluindoId, setExcluindoId] = useState(null);

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

    function confirmarExclusao(filme) {
        Alert.alert(
            "Excluir filme",
            `Tem certeza que quer excluir "${filme.title}"? Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => excluirFilme(filme.id),
                },
            ]
        );
    }

    async function excluirFilme(id) {
        setExcluindoId(id);
        try {

            await api.delete(`/api/filmes/${id}`);


            setFilmes((atual) => atual.filter((item) => item.id !== id));
        } catch (e) {
            Alert.alert(
                "Não deu pra excluir o filme",
                "A API respondeu com erro. Tenta de novo em instantes."
            );
        } finally {
            setExcluindoId(null);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Excluir filme</Text>
                    <Text style={styles.subtitulo}>DELETE /api/filmes/:id</Text>
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
                                    {item.diretor} · {item.genero} · {item.ano}
                                </Text>
                            </View>
                            <Pressable
                                style={styles.botaoExcluir}
                                onPress={() => confirmarExclusao(item)}
                                disabled={excluindoId === item.id}
                            >
                                <Text style={styles.botaoExcluirTexto}>
                                    {excluindoId === item.id ? "..." : "Excluir"}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
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
        marginTop: 2 
    },
    erro: { 
        color: "#c62828", 
        marginTop: 12 
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 12,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        paddingRight: 12,
    },
    imagem: { 
        width: 64, 
        height: 64 
    },
    info: { 
        flex: 1, 
        justifyContent: "center" 
    },
    titulo: { 
        fontSize: 16, 
        fontWeight: "700" 
    },
    categoria: { 
        fontSize: 13, 
        color: "#64748b" 
    },
    botaoExcluir: {
        backgroundColor: "#c62828",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    botaoExcluirTexto: { 
        color: "white", 
        fontWeight: "700", 
        fontSize: 13 
    },
});