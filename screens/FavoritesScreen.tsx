import React, {useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const stored = await AsyncStorage.getItem('favorites');
          const parsed = stored ? JSON.parse(stored) : [];
          setFavorites(parsed);
        } catch (e) {
          console.error('Failed to load favorites', e);
        }
      };

      loadFavorites();
    }, []),
  );

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.quote}>"{item.quote}"</Text>
      <Text style={styles.author}>— {item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favorite Quotes</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: '600',
  },
});
