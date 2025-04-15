import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

const HomeScreen = ({navigation}) => {
  const getRandomQuote = async () => {
    const randomId = Math.floor(Math.random() * 30) + 1;

    try {
      const response = await fetch(`https://dummyjson.com/quotes/${randomId}`);
      const data = await response.json();
      navigation.navigate('Quote', {quote: data});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg1.jpeg')}
      style={styles.container}
      imageStyle={{opacity: 0.3}}>
      <View style={styles.content}>
        <Text style={styles.title}>InspireMe</Text>
        <Text style={styles.subtitle}>Find your daily dose of inspiration</Text>
        
        <TouchableOpacity onPress={getRandomQuote} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Get Inspired ✨</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Favorites')} 
          style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>❤️ View Favorites</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: '600',
  },
});
