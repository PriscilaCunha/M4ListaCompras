import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import Home from './src/Home';
import Loading from './src/Loading';
import Authentication from './src/Authentication';
import AddProduct from './src/AddProduct';
import EditProduct from './src/EditProduct';
import DetailProduct from './src/DetailProduct';

LogBox.ignoreLogs(['Setting a timer', 'Possible', 'AsyncStorage', 'Cannot']);

function App() {

  const [userUid, setUserUid] = useState();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyARjOyJeG7ECm9MtjkGHGPEi3WI2DZDBHo",
    authDomain: "igti-teste.firebaseapp.com",
    databaseURL: "https://igti-teste-default-rtdb.firebaseio.com",
    projectId: "igti-teste",
    storageBucket: "igti-teste.appspot.com",
    messagingSenderId: "459966793365",
    appId: "1:459966793365:web:db1fd805690bb23c79fd9c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  
  useEffect(async () => {
    setUserUid(await AsyncStorage.getItem('userUid') || '')
  }, []);
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loading" component={loading}
          options={{
            headerShown: false
          }}
          initialParams={{ 'userUid': userUid }}
        />

        <Stack.Screen name="authentication" component={Authentication} options={{
          headerShown: false,
          headerBackVisible: false
        }} />

        <Stack.Screen name="home" component={Home} 
          options={{
            title: 'Inicio',
            headerBackVisible: false
          }}
          initialParams={{ 'userUid': userUid }}
        />

        <Stack.Screen name="addProduct" component={AddProduct} options={{
          title: 'Adicionar produto'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  button: {
      alignItems: "center",
      backgroundColor: '#DDDDDD',
      padding: 10
  }
});

export default App;
