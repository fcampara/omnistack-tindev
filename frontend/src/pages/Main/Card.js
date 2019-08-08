import React from 'react'

import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'

export default function Card({ users, handleLike, handleDislike }) {
  return (
    users ?
      <ul>
        {
          users.map(user =>
            <li key={user._id}>
              <img src={user.avatar} alt={user.name}/>
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button>
                  <img src={dislike} alt="Dislike" onClick={() => handleDislike(user._id)}/>
                </button>
                <button type="button">
                  <img src={like} alt="Like" onClick={() => handleLike(user._id)}/>
                </button>
              </div>
            </li>
          )
        }
      </ul>
      : <div className="empty">Acabou :(</div>
  )
}
