import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

export default function App() {
  const [campo, setCampo] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [info, setInfo] = useState(false);

  async function buscarCep(cep) {
    //regx
    const cepLimpo = cep.replace(/\ D/g, "");
    if (cepLimpo === "") {
      alert("Preencha o cep");
      return;
    }
    if (cepLimpo.length !== 8) {
      alert("CEP Invalido. Digite 8 numeros");
      return;
    }

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json`
      );
      const json = await resposta.json();
      if (json.error) {
        throw new Error("CEP NÃO ENCONTRADO");
      }
      setBairro(json.bairro);
      setCidade(json.localidade);
      setLogradouro(json.logradouro);
      setCep(json.cep);
      setInfo(true);
    } catch (error) {
      console.error("Erro ao consultar API: " + error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <View style={styles.cabecalho}>
          <Entypo name="location-pin" size={32} color={"black"} />
          <Text style={styles.titulo}>Busca Endereço</Text>
        </View>
        <Text style={styles.subtitulo}>
          Digite o CEP para encontrar o endereço completo
        </Text>
        <Text style={styles.label}>CEP</Text>
        <View style={styles.formulario}>
          <TextInput
            value={campo}
            onChangeText={(text) => setCampo(text)}
            placeholder="00000000"
            style={styles.campo}
          />
          <TouchableOpacity
            onPress={() => buscarCep(campo)}
            style={styles.botaoPequisa}
          >
            <Entypo name="magnifying-glass" size={24} color={"white"} />
          </TouchableOpacity>
        </View>

        {info && (
          <View style={styles.endereco}>
            <Text style={styles.tituloCep}>Endereço Encontrado</Text>

            <View style={styles.informacoes}>
              <View>
                <Text style={styles.tituloInfo}>Cep</Text>
                <Text style={styles.enderecoInfo}>{cep}</Text>
              </View>

              <View>
                <Text style={styles.tituloInfo}>Logradouro</Text>
                <Text style={styles.enderecoInfo}>{logradouro}</Text>
              </View>

              <View>
                <Text style={styles.tituloInfo}>Bairro</Text>
                <Text style={styles.enderecoInfo}>{bairro}</Text>
              </View>

              <View>
                <Text style={styles.tituloInfo}>Cidade</Text>
                <Text style={styles.enderecoInfo}>{cidade}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  caixa: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 4,
    padding: 12,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#333333",
  },
  label: {
    fontWeight: "bold",
    marginTop: 6,
  },
  formulario: {
    marginTop: 4,
    flexDirection: "row",
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d4d4d4d4",
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    borderTopLeftRadius: 4,
    fontSize: 18,
    paddingVertical: 6,
  },
  botaoPequisa: {
    backgroundColor: "#000000",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  endereco: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4d4d4d",
    padding: 12,
  },
  tituloCep: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tituloInfo: {
    color: "#b8aa95",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
  },
  enderecoInfo: {
    color: "#7c7c7c",
    fontSize: 17,
    fontWeight: "bold",
  },
});
