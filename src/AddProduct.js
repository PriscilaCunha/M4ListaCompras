import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase, ref, push } from 'firebase/database';

export default function addProduct({ route, navigation }) {

    const [nome, setNome] = useState(null);
    const [quantidade, setQuantidade] = useState(null);

    const salvarProduto = async () => {
        try {
            const db = getDatabase();
            push(ref(db, 'produtos'), {
                nome, 
                quantidade
            });

            navigation.navigate('home');

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View>
            <Text style={styles.titulo}>Adicionar produto</Text>

            <TextInput
                style={{...styles.inputText}}
                onChangeText={setNome}
                value={nome}
                placeholder='Digite o nome do produto'
            />

            <TextInput
                style={{...styles.inputText}}
                onChangeText={setQuantidade}
                value={quantidade}
                placeholder='Digite a quantidade'
            />
        </View>
        // TODO: continue
    );
}