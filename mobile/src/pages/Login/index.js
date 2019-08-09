import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import logo from '../../assets/logo.png'
import style from './style'

import api from '../../services/api'

export default function Login({ navigation }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) navigation.navigate('Main', { user })
    })
  }, [])

  function handleLogin() {
    api.post('/devs', { username: user }).then(async ({ data }) => {
      const { _id } = data

      await AsyncStorage.setItem('user', _id)
      navigation.navigate('Main', { _id })
    })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo}/>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create(style)