// src/components/FoodItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FoodItem = ({ item, onDelete, onToggleStatus }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => onDelete(item.id), style: "destructive" }
      ]
    );
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Animated.View style={{ transform: [{ translateX: trans }] }}>
          <MaterialCommunityIcons name="delete" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.status, item.status ? styles.available : styles.inactive]}>
            {item.status ? "Available" : "Inactive"}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, item.status ? styles.activeButton : styles.inactiveButton]}
          onPress={() => onToggleStatus(item.id)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <MaterialCommunityIcons
            name={item.status ? "food" : "food-off"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  available: {
    color: '#4CAF50',
  },
  inactive: {
    color: '#F44336',
  },
  toggleButton: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  inactiveButton: {
    backgroundColor: '#F44336',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});

export default FoodItem;