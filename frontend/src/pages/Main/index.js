import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'

import Card from './Card'
import api from '../../services/api'
import logo from '../../assets/logo.svg'

export default function Main({ match }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async function loadUsers() {
      api.defaults.headers.common['user'] = match.params.id
      api('/devs').then(({ data }) => {
        setUsers(data.users)
      })
    })()
  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`).then(() => {
      setUsers(users.filter(user => user._id !== id))
    })
  }

  async function handleDislike(id) {
    api.post(`/devs/${id}/dislikes`).then(() => {
      setUsers(users.filter(user => user._id !== id))
    })
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev"/>
      </Link>
      <Card users={users} handleLike={handleLike} handleDislike={handleDislike}/>
    </div>
  )
}
