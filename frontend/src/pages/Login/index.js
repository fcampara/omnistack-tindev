import React, { useState } from 'react'

import './Login.css'
import api from '../../services/api'
import logo from '../../assets/logo.svg'

export default function Login({ history }) {
  const [username, setUsername] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    api.post('/devs', { username }).then(({ data }) => {
      if (data._id) {
        api.defaults.headers.common['user'] = data._id
        history.push(`/dev/${data._id}`)
      }
    })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev"/>
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
