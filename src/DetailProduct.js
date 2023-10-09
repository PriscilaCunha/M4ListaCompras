import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase, ref, set } from 'firebase/database';

export default function DetailProduct({ route, navigation }) {
    const { produto } = route.params;
    
    const nome = produto.nome;
    const quantidade = produto.quantidade;

    const db = getDatabase();

    async function ExcluirProduto(id) {
        set(ref(db, `produtos/${id}`), null);

        navigation.navigate('home');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes do Produto</Text>

            <View style={styles.viewProduct}>
                <Text style={styles.itemText}>
                    Nome do produto: {nome}
                </Text>

                <Text style={styles.itemText}>
                    Quandidade do produto: {quantidade}
                </Text>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('editProduct', {produto})}
                    style={styles.buttonEditarInf}>
                    
                    <Text style={styles.textEditarInf}>Editar produto</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => ExcluirProduto(produto.id)}
                    style={styles.buttonExcluirInf}>
                    
                    <Text style={styles.textAdicionar}>Excluir produto</Text>
                </TouchableOpacity>
            </View>
        </View>
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