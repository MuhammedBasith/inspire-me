import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const images = [
  require('../assets/bg1.jpeg'),
  require('../assets/bg2.jpeg'),
  require('../assets/bg3.jpeg'),
];

const QuoteScreen = ({ route }) => {
  const { quote } = route.params;

  // Pick a random image only once per render
//   const backgroundImage = useMemo(() => {
//     const idx = Math.floor(Math.random() * images.length);
//     return images[idx];
//   }, []);

  const backgroundImage = images[Math.floor(Math.random() * images.length)];

  return (
    <ImageBackground source={backgroundImage} style={styles.bg} imageStyle={{ opacity: 0.8 }}>
      <View style={styles.overlay}>
        <Text style={styles.quote}>"{quote.quote}"</Text>
        <Text style={styles.author}>— {quote.author}</Text>
      </View>
    </ImageBackground>
  );
};

export default QuoteScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 20,
    borderRadius: 12,
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: '600',
  },
});
