import React from 'react'
import empty from '../../assets/empty.png'
import './Empty.scss'
const Empty = () => {
  return (
    <div>
        <div className="empty">
        <img  src={empty} alt="" />
        <h2>Empty</h2>
        </div>
    </div>
  )
}

export default Empty