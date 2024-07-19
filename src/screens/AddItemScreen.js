// src/screens/AddItemScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AddItemScreen = ({ route, navigation }) => {
  const { addFoodItem } = route.params;
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    if (itemName.trim()) {
      addFoodItem({ name: itemName.trim(), status: true });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View entering={FadeInDown.duration(1000)} style={styles.innerContainer}>
            <Text style={styles.icon}>🍽️</Text>
            <Text style={styles.title}>Add New Dish</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={itemName}
              onChangeText={setItemName}
              placeholderTextColor="#aaa"
            />
            <Animated.View entering={FadeInUp.duration(1000).delay(500)}>
              <TouchableOpacity 
                style={[styles.button, !itemName.trim() && styles.buttonDisabled]} 
                onPress={handleAddItem}
                disabled={!itemName.trim()}
              >
                <Text style={styles.buttonText}>Add to Menu</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#ff6b6b',
    borderRadius: 25,
    padding: 15,
    width: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 107, 107, 0.5)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddItemScreen;