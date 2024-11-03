import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, Dimensions, PixelRatio } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ScreenOrientation from 'expo-screen-orientation';


const { width } = Dimensions.get('window');
const fontSize = PixelRatio.get() < 2 ? 16 : 18;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState(null);
  const [outputUnit, setOutputUnit] = useState(null);
  const [convertedValue, setConvertedValue] = useState('');
  const [error, setError] = useState('');
  const [orientation, setOrientation] = useState(null);

  const convertValue = () => {
    if (!inputValue || !inputUnit || !outputUnit) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError('Digite um valor numérico válido.');
      return;
    }

    setError(''); // Limpa o erro caso tudo esteja correto
    let result = 0;

    switch (inputUnit) {
      case 'cm': result = value / 100; break;
      case 'm': result = value; break;
      case 'km': result = value * 1000; break;
      case 'mile': result = value * 1609.34; break;
      default: break;
    }

    switch (outputUnit) {
      case 'cm': result *= 100; break;
      case 'm': break;
      case 'km': result /= 1000; break;
      case 'mile': result /= 1609.34; break;
      default: break;
    }

    setConvertedValue(`${result.toFixed(3)} ${outputUnit}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Conversor de Unidades</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite um valor"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            setConvertedValue('');
          }}
        />

        <RNPickerSelect
          onValueChange={(value) => {
            setInputUnit(value);
            setConvertedValue('');
          }}
          items={[
            { label: 'Centímetros', value: 'cm' },
            { label: 'Metros', value: 'm' },
            { label: 'Quilômetros', value: 'km' },
            { label: 'Milhas', value: 'mile' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione a unidade de entrada', value: null }}
        />

        <RNPickerSelect
          onValueChange={(value) => {
            setOutputUnit(value);
            setConvertedValue('');
          }}
          items={[
            { label: 'Centímetros', value: 'cm' },
            { label: 'Metros', value: 'm' },
            { label: 'Quilômetros', value: 'km' },
            { label: 'Milhas', value: 'mile' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione a unidade de saída', value: null }}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.result}>Resultado: {convertedValue}</Text>

        <Text style={styles.button} onPress={convertValue}>
          Converter
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: fontSize + 8,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: width * 0.8, // largura relativa
    padding: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  result: {
    fontSize: fontSize,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSize,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    width: width * 0.8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: fontSize,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    width: width * 0.8,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: fontSize,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    width: width * 0.8,
    marginBottom: 20,
  },
});