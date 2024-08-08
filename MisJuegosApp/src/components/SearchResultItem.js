import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SearchResultItem = ({ game, onPress }) => {
  const coverUrl = game.cover && game.cover.url ? `https:${game.cover.url}` : null;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.coverImage} />
      ) : (
        <View style={styles.coverPlaceholder} />
      )}
      <Text style={styles.gameTitle}>{game.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  coverImage: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  coverPlaceholder: {
    width: 50,
    height: 70,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  gameTitle: {
    fontSize: 16,
  },
});

export default SearchResultItem;
