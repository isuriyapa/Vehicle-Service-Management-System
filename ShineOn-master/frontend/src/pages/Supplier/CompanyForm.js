import { useEffect, useState } from "react"
import axios from "axios"
import SupplierAPI from "../../api/SupplierAPI"
import React from 'react';
const CompanyForm = () => {
    
    const[CompanyCode, setCompanyCode] = useState('')
    const[CompanyName, setCompanyName] = useState('')
    const[ContactNumber, setContactNumber] = useState('')   
    const[Address, setAddress] = useState('')
    const[Email, setEmail] = useState('')
    const[Product, setProducts] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isErr, setIsErr] = useState(false)

    useEffect(() => {
        const email = sessionStorage.getItem('email');
        const permissionLevel = sessionStorage.getItem('permissionLevel');
        if(!email || permissionLevel != 'SUPPLIER'){
          window.location.href = '/supplierLogin';
        }
      
      }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsErr(false)
        const request = {
            CompanyCode,
            CompanyName,
            Address,
            ContactNumber,
            Email,
            Product,
        }
        await SupplierAPI.createCompanyRequest(request).then((response)=>{
            // Set submitted to true to show confirmation message
            setSubmitted(true)
            
            setCompanyCode();
            setCompanyName('')
            setAddress('')
            setContactNumber()
            setEmail('')
            setProducts('')

        }).catch((error)=>{
            setIsErr(true)
            console.log(error)
        })
        
    }

    return(
    
        <>
        <form className="req" style={{marginTop:'20px', marginBottom:'20px'}} onSubmit={handleSubmit}>
            <h2>Welcome To Your Account</h2>
            <h3>Company Information</h3>

            <label>Company Code</label>
            <input
                type="text"
                
                onChange={(e) => setCompanyCode(e.target.value)}
                value={CompanyCode}
            />
            <label>Company Name</label>
            <input
               type="text"
               onChange={(e) => setCompanyName(e.target.value)}
               value={CompanyName}
            />
            <label>Address</label>
            <input
               type="text"
               onChange={(e) => setAddress(e.target.value)}
               value={Address}
            />
            <label>Contact Number</label>
            <input
                type="text" placeholder="0##########"
                onChange={(e) => setContactNumber(e.target.value)}
                value={ContactNumber}
            />
            <label>Email</label>
            <input
                type="Email" placeholder="ABC@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
            />
            <label>Products</label>
            <input
                type="text"
                onChange={(e) => setProducts(e.target.value)}
                value={Product}
            />

            {/* Conditionally render confirmation message */}
            {submitted && <p>Thank you for your order!</p>}
            {isErr && <p style={{textAlign:'center',color:'red'}}>Failed to submit your request. Please try again.</p>}

            <button type={"submit"}> SUBMIT </button>
            
        </form>

            
        </>   
    )        

}
export default CompanyForm





