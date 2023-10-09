import React, { useEffect, useState } from 'react';
import { ListItem } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase, ref, set, onValue } from 'firebase/database';
import { ActivityIndicator, SafeAreaView, TouchableOpacity, View } from 'react-native/types';

export default function Home({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const db = getDatabase();

    async function ExcluirProduto(id) {
        set(ref(db, `produtos/${id}`), null)
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const produtos = ref(db, 'produtos');

                onValue(produtos, (snapshot) => {
                    const data = snapshot.val();
                    if(data) {
                        const values = [];

                        for (const key of Object.keys(data)) {
                            values.push({
                                id: key,
                                ...data[key ]
                            })
                        }

                        return setProdutos(values);
                    }
                    return setProdutos(['empty']);
                })
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Lista de compras</Text>

            <TouchableOpacity
                style={styles.buttonAdicionar}
                onPress={() => navigation.navigate('addProduct')}
                >
                <Text style={styles.textAdicionar}>Adicionar produto</Text>
            </TouchableOpacity>

            {
                produtos[0] === 'empty' ?
                    <Text style={styles.textProdutos}>
                        Não há produtos cadastrados.
                    </Text>

                    :
                    produtos.length > 0 ? produtos.map((produto, i) => (

                        <ListItem.Swipeable
                            onPress={() => navigation.navigate('detailProduct', {produto})} 
                            key={i}
                            style={{ margin: 10 }}
                            leftContent={
                                <TouchableOpacity
                                    style={{ ...styles.buttonContent, backgroundColor: '#fbec5d', marginTop: 10 }}
                                    onPress={() => navigation.navigate('editProduct', {produto})}
                                >
                                    <Text style={{ margin: -10 }}>Editar</Text>
                                </TouchableOpacity>
                            }
                            rightContent={
                                <TouchableOpacity
                                    style={{ ...styles.buttonContent, backgroundColor: '#cd5c5c', marginTop: 10 }}
                                    onPress={() => ExcluirProduto(produto.id)}
                                >
                                    <Text style={{ margin: -10 }}>Excluir</Text>
                                </TouchableOpacity>
                            }
                        >
                            <ListItem.Content onPress={() => navigation.navigate('detailProduct', {produto})}>
                                <ListItem.Title>Nome do produto: {produto.nome}</ListItem.Title>
                                <ListItem.Subtitle>Quantidade: {produto.quantidade}</ListItem.Subtitle>
                            </ListItem.Content>
                            
                            <ListItem.Chevron onPress={() => navigation.navigate('detailProduct', {produto})} />
                        </ListItem.Swipeable>
                    )) : <View style={ [styles.container, styles.horizontal]}>
                        <ActivityIndicator color='#00a000' size='large' />
                    </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttonContent: {
        minHeight: '100%'
    }
});
    // TODO: Continue