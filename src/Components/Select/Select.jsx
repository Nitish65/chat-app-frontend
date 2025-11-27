import './Select.css'
import React from 'react'

const Select = ({ value, onChange }) => {
  return (
    <div className="select-wrapper">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="styled-select"
      >
        <option value="Select Room">Select Room</option>
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Nodejs">Nodejs</option>
        <option value="Java">Java</option>
      </select>
    </div>
  )
}

export default Select;
