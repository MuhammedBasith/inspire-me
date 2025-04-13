import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>InspireMe</Text>
      <TouchableOpacity onPress={getRandomQuote} style={styles.button}>
        <Text>Get Inspired ✨</Text>
      </TouchableOpacity>

      {/* <Button title="Get Inspired ✨" onPress={getRandomQuote} /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
