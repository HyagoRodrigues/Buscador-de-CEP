import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);
  async function buscar() {
    if (cep == '') {
      alert('Digite um CEP válido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      console.log(response.data);
      Keyboard.dismiss();
    } catch (e) {
      console.log('Error');
    }
  }

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text>Digite o CEP dejesado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 75690703"
          value={cep}
          onChangeText={texto => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}>
          <Text style={styles.botaoTxt}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#CD3e1d'}]}
          onPress={limpar}>
          <Text style={styles.botaoTxt}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && (
        <View style={styles.resultado}>
          <Text style={styles.itemTxt}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemTxt}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemTxt}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemTxt}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemTxt}>Bairro: {cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
  },
  texto: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoTxt: {
    color: 'white',
  },
  resultado: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTxt: {
    fontSize: 22,
  },
});
