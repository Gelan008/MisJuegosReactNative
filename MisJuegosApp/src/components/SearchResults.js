import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import SearchResultItem from './SearchResultItem';

const SearchResults = ({ searchResults, onSaveGame }) => {
  const renderItem = ({ item }) => (
    <SearchResultItem
      game={item}
      onPress={() => onSaveGame(item)}
    />
  );

  return (
    <View style={styles.container}>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron resultados</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});

export default SearchResults;
