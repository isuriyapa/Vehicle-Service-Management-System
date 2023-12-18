import { useState } from "react"
import { useLoginS } from "../../hooks/useLogin"
import React from 'react';
import { useSupplierLogin } from "../../hooks/useSupplierLogin";
import SupplierAPI from "../../api/SupplierAPI";
import makeToast from "../../components/toast";


const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const {login, error, isLoading} = useSupplierLogin();
  const [isErr, setIsErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false)
    try {
      await SupplierAPI.supplierLogin({ Email, Password })
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('email', response.data.Email);
          localStorage.setItem('permissionLevel','SUPPLIER')
          localStorage.setItem('supplier',response.data.Email)
          sessionStorage.setItem('authToken', response.data.token);
          sessionStorage.setItem('permissionLevel','SUPPLIER')
          sessionStorage.setItem('email', response.data.Email);


          window.location.href = '/supplier/home';
        })
        .catch((error) => {
          setIsErr(true)
          console.log(error);
        });
    } catch (error) {
      setIsErr(true)
      console.log(error);
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
    <h2>Supplier Profile</h2>
      <h3>Log In</h3>
      
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
      {/* {error && <div className="error">{error}</div>} */}

      {isErr && <p className="error">Failed to login to the system. Please enter a valid email and password.</p>}

      <button disabled={isLoading}>Log in</button>

      

    </form>
  )
}

export default Login