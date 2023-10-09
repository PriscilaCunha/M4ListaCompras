import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase, ref, update } from 'firebase/database';

export default function EditProduct({ route, navigation }) {
    const { produto } = route.params;

    const [nome, setNome] = useState(produto.nome);
    const [quantidade, setQuantidade] = useState(produto.quantidade);

    const atualizarProduto = async () => {
        try {
            const db = getDatabase();

            update(ref(db, `produtos/${produto.id}`, {
                nome: nome,
                quantidade: quantidade
            }));
            navigation.navigate('home');

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Editar produto</Text>

            <TextInput
                style={styles.inputText}
                onChangeText={setNome}
                value={nome}
                placeholder='Digite o nome do produto'
            />

            <TextInput
                style={styles.inputText}
                onChangeText={setQuantidade}
                value={quantidade}
                placeholder='Digite a quantidade'
            />

            <TouchableOpacity
                onPress={() => { atualizarProduto() }}
                style={{ ...styles.buttonSalvarEd, margin: 25 }}
            >
                <Text 
                    style={styles.textAdicionar}>
                    Salvar produto
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // TODO: Continue
    button: {
        alignItems: "center",
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttonContent: {
        minHeight: '100%'
    }
});