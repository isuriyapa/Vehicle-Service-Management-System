import { useState } from "react"
import React from 'react';

const SupplierSignup = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()


  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
    <h2>Supplier Profile</h2>  
      <h3>Sign Up</h3>
      
      <label>Email:</label>
      <input 
        type="email" placeholder="ABC@gmail.com"
        onChange={(e) => setEmail(e.target.value)} 
        value={Email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />
        <label>Conform Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />
      <button>Sign up</button>
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  )
}

export default SupplierSignup