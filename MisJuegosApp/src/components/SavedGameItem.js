import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SavedGameItem = ({ game, onDelete }) => {
  return (
    <View style={styles.container}>
      {game.cover && game.cover.uri ? (
        <Image source={{ uri: game.cover.uri }} style={styles.coverImage} />
      ) : (
        <View style={styles.coverPlaceholder} />
      )}
      <Text style={styles.gameTitle}>{game.name}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  coverImage: {
    width: 100,
    height: 140,
    marginBottom: 10,
  },
  coverPlaceholder: {
    width: 100,
    height: 140,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  gameTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SavedGameItem;
