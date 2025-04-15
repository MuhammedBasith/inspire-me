import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



const images = [
  require('../assets/bg1.jpeg'),
  require('../assets/bg2.jpeg'),
  require('../assets/bg3.jpeg'),
];

const QuoteScreen = ({ route }) => {
  const { quote } = route.params;

  const saveToFavorites = async () => {
    try {
      const existing = await AsyncStorage.getItem('favorites');
      const parsed = existing ? JSON.parse(existing) : [];

      // Check for duplicates
      const alreadySaved = parsed.find((q: {id: number}) => q.id === quote.id);
      if (alreadySaved) {
        Alert.alert(
          'Already Saved',
          'This quote is already in your favorites!',
        );
        return;
      }

      const updated = [...parsed, quote];
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      Alert.alert('Saved!', 'Quote added to favorites ❤️');
    } catch (e) {
      console.error('Saving error', e);
    }
  };

  // Get a random background image
  const backgroundImage = images[Math.floor(Math.random() * images.length)];

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.bg}
      imageStyle={{opacity: 0.8}}>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.quote}>"{quote.quote}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={saveToFavorites}>
          <Text style={styles.favoriteButtonText}>❤️ Save to Favorites</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default QuoteScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quote: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2c3e50',
    lineHeight: 32,
  },
  author: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: '600',
    color: '#3498db',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    width: '80%',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
