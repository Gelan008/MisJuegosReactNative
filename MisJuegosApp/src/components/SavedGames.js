import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import SavedGameItem from './SavedGameItem';

const SavedGames = ({ myGames, onDeleteGame }) => {
  const renderItem = ({ item }) => (
    <SavedGameItem game={item} onDelete={() => onDeleteGame(item.id)} />
  );

  return (
    <View style={styles.container}>
      {myGames.length > 0 ? (
        <FlatList
          data={myGames}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noGames}>No tienes juegos guardados</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noGames: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});

export default SavedGames;
