import { Link } from 'react-router-dom'
import { useEffect } from "react"
import React from 'react';

const SupplierNewHome = () => {
  
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const permissionLevel = sessionStorage.getItem('permissionLevel');

    if(!email || permissionLevel != 'SUPPLIER'){
      window.location.href = '/supplierLogin';
    }
  
  }, [])

  return (
    <div className="home1" style={{height:'100vh', textAlign:'center'}}>
   
            <ul style={{paddingTop:'40vh'}}>
              <li style={{display:'inline'}}><Link  class="button1" to ="/supplier/companyForm"> COMPANY</Link></li>
              <li style={{display:'inline'}}><Link  class="button1" to ="/supplier/requestForm"> SUPPLIER</Link></li>
            </ul>
    </div>    
  )

}

export default SupplierNewHome
