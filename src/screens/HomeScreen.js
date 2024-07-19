// src/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FoodItem from '../components/FoodItem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
  const [foodItems, setFoodItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Refresh the list when the screen comes into focus
      // You might want to fetch data from an API here
    }, [])
  );

  const addFoodItem = (item) => {
    setFoodItems([{ id: Date.now().toString(), ...item }, ...foodItems]);
  };

  const deleteFoodItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const toggleFoodItemStatus = (id) => {
    setFoodItems(foodItems.map(item => 
      item.id === id ? { ...item, status: !item.status } : item
    ));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Food Items</Text>
      <Text style={styles.headerSubtitle}>{foodItems.length} items</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <FlatList
        data={foodItems}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100)}>
            <FoodItem 
              item={item} 
              onDelete={deleteFoodItem} 
              onToggleStatus={toggleFoodItemStatus} 
            />
          </Animated.View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddItem', { addFoodItem })}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    marginTop:30
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ddd',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;