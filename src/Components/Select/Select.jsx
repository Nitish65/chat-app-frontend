import './Select.css'
import React from 'react'

const Select = () => {
  return (
    <div>
        <select name="room-name" id="room-name" >
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
        </select>
    </div>
  )
}

export default Select