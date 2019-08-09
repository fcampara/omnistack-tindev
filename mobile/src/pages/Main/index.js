import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import api from '../../services/api'
import dislike from '../../assets/dislike.png'
import like from '../../assets/like.png'
import logo from '../../assets/logo.png'
import style from './style'

export default function Main({ navigation }) {
  const _id = navigation.getParam('_id')
  console.log(_id)
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async function loadUsers() {
      api.defaults.headers.common['user'] = _id
      api('/devs').then(({ data }) => {
        setUsers(data.users)
      })
    })()
  }, [_id])

  async function handleLogout() {
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }

  async function handleLike() {
    const [ user, ...rest ] = users

    await api.post(`/devs/${user._id}/likes`).then(() => {
      setUsers(rest)
    })
  }

  async function handleDislike() {
    const [ user, ...rest ] = users

    api.post(`/devs/${user._id}/dislikes`).then(() => {
      setUsers(rest)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo}/>
      </TouchableOpacity>

      <View style={[styles.cardsContainer]}>
        { users.length == 0
          ? <Text style={styles.empty}> Acabou :( </Text>
          : (
            users.map((user, index) => (
                <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                  <Image style={styles.avatar} source={{ uri: user.avatar}}/>
                  <View style={styles.footer}>
                    <Text style={styles.name}> { user.name } </Text>
                    <Text style={styles.bio} numberOfLines={3}> { user.bio }</Text>
                  </View>
                </View>
            ))
            )
          }
        </View>

      {
        users.length > 0 && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDislike}>
              <Image source={dislike}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLike}>
              <Image source={like}/>
            </TouchableOpacity>
          </View>
        )
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create(style)