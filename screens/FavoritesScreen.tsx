import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

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

  const removeFromFavorites = async (id: number) => {
    try {
      const updated = favorites.filter(item => item.id !== id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
      Alert.alert('Removed', 'Quote removed from favorites');
    } catch (e) {
      console.error('Error removing quote', e);
    }
  };

  const renderItem = ({item}: {item: Quote}) => (
    <View style={styles.card}>
      <Text style={styles.quote}>"{item.quote}"</Text>
      <Text style={styles.author}>— {item.author}</Text>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromFavorites(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/bg2.jpeg')}
      style={styles.background}
      imageStyle={{opacity: 0.1}}>
      <View style={styles.container}>
        <Text style={styles.title}>❤️ Favorite Quotes</Text>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No favorites yet!</Text>
            <Text style={styles.emptySubtext}>Save some quotes to see them here</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#7f8c8d',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    color: '#95a5a6',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 12,
    color: '#2c3e50',
    lineHeight: 26,
  },
  author: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 16,
  },
  removeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
