import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  createTable,
  createPessoa,
  getAllPessoas,
  deleteAllPessoas,
} from "./src/repository/pessoaRepository";

export default function App() {
  const [nome, setNome] = useState(null);
  const [idade, setIdade] = useState(null);
  const [listaPessoas, setListaPessoas] = useState([]);

  useEffect(async () => {
    createTable();
    setListaPessoas(await Pessoa.query());
  }, []);

  const handleClick = async () => {
    if (!nome || !idade) return;

    createPessoa(nome, idade);

    setListaPessoas(await getAllPessoas());

    setNome(null);
    setIdade(null);
  };

  const handleDelete = () => {
    deleteAllPessoas();
    setListaPessoas([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: "80%", borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={{ width: "80%", borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Digite sua idade"
        value={idade}
        onChangeText={setIdade}
      />
      <Button title="Excluir lista" onPress={handleDelete} />
      <Text style={styles.texto}>EXCLUIR LISTA</Text>
      <Button title="Cadastre-se" onPress={handleClick} />
      <Text style={styles.texto}>LISTA DE PESSOAS</Text>
      {listaPessoas.map((pessoa) => {
        return (
          <View key={pessoa.id}>
            <Text>ID: {pessoa.id}</Text>
            <Text>NOME: {pessoa.nome}</Text>
            <Text>IDADE: {pessoa.age}</Text>
          </View>
        );
      })}

      <StatusBar style="auto" />
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
  texto: {
    marginTop: 8,
  },
  button: {
    padding: 10,
  },
});
