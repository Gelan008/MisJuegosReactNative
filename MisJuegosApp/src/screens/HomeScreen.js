import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import debounce from 'lodash/debounce';
import * as FileSystem from 'expo-file-system'; // Importación correcta
import SearchResults from '../components/SearchResults';
import SavedGames from '../components/SavedGames';
import { API_CONFIG } from '../config/config';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    loadStoredGames();
  }, []);

  const loadStoredGames = async () => {
    try {
      const storedGames = await AsyncStorage.getItem('myGames');
      if (storedGames) {
        setMyGames(JSON.parse(storedGames));
      }
    } catch (error) {
      console.error('Error al cargar juegos desde el almacenamiento interno', error);
    }
  };

  const saveGame = async (game) => {
    try {
      const existingGame = myGames.find((g) => g.id === game.id);
      if (existingGame) {
        alert("Este juego ya está guardado");
        return;
      }

      const coverUrl = game.cover && game.cover.url ? `https:${game.cover.url}` : null;
      let coverPath = null;

      if (coverUrl) {
        const fileName = `${game.id}.jpg`;
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        try {
          const { uri } = await FileSystem.downloadAsync(coverUrl, fileUri); // Descarga de la imagen
          coverPath = uri;
        } catch (e) {
          console.error('Error downloading image', e);
        }
      }

      const newGame = { ...game, cover: { ...game.cover, uri: coverPath } };
      const newGames = [...myGames, newGame];
      setMyGames(newGames);
      await AsyncStorage.setItem('myGames', JSON.stringify(newGames));
    } catch (error) {
      console.error('Error al guardar el juego seleccionado', error);
    }
  };

  const deleteGame = async (id) => {
    try {
      const updatedGames = myGames.filter((game) => game.id !== id);
      setMyGames(updatedGames);
      await AsyncStorage.setItem('myGames', JSON.stringify(updatedGames));
    } catch (error) {
      console.error('Error al eliminar el juego', error);
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const searchGames = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const config = {
      headers: {
        'Client-ID': API_CONFIG.clientId,
        'Authorization': `Bearer ${API_CONFIG.accessToken}`,
      },
    };

    const queryBody = `search "${query}"; fields name,cover.url;`;

    try {
      const response = await axios.post('https://api.igdb.com/v4/games', queryBody, config);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error en la busqueda', error.response ? error.response.data : error.message);
    }
  };

  const debouncedSearch = useCallback(debounce(searchGames, 300), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis juegos</Text>
      <Searchbar
        placeholder="Buscar juegos"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <SearchResults searchResults={searchResults} onSaveGame={saveGame} />
      <Text style={styles.subtitle}>Juegos guardados</Text>
      <SavedGames myGames={myGames} onDeleteGame={deleteGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  searchbar: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
