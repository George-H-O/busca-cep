import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Entypo from "@expo/vector-icons/Entypo"

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <View style={styles.cabecalho}>
          <Entypo name='location-pin' size={32} color={"black"} />
          <Text style={styles.titulo}>Busca Endereço</Text>
        </View>
        <Text style={styles.subtitulo}>Digite o CEP para encontrar o endereço completo</Text>
        <Text style={styles.label}>CEP</Text>
        <View style={styles.formulario}>
          <TextInput placeholder='00000000' style={styles.campo} />
          <TouchableOpacity style={styles.botaoPequisa}>
            <Entypo name='magnifying-glass' size={24} color={"white"}/>
          </TouchableOpacity>
        </View>

        <View style={styles.endereco}>
          <Text style={styles.tituloCep}>Endereço Encontrado</Text>

          <View style={styles.informacoes}>
            <View>
              <Text style={styles.tituloInfo}>Cep</Text>
              <Text style={styles.enderecoInfo}>29150120</Text>
            </View>

            <View>
              <Text style={styles.tituloInfo}>Logradouro</Text>
              <Text style={styles.enderecoInfo}>Rua são Jose</Text>
            </View>

            <View>
              <Text style={styles.tituloInfo}>Bairro</Text>
              <Text style={styles.enderecoInfo}>Rua São Jose</Text>
            </View>

            <View>
              <Text style={styles.tituloInfo}>Cidade</Text>
              <Text style={styles.enderecoInfo}>Cariacica</Text>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
