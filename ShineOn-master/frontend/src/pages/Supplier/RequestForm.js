import { useEffect, useState } from "react"
import React from 'react';
import SupplierAPI from "../../api/SupplierAPI";

const RequestForm = () => {
    
    const [chooseItem, setChooseItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [typeOfNeedService, setTypeOfNeedService] = useState('')
    const [addingAcomment, setAddingAcomment] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isErr, setIsErr] = useState(false)

    useEffect(() => {
        const email = sessionStorage.getItem('email');
        const permissionLevel = sessionStorage.getItem('permissionLevel');
        if(!email || permissionLevel != 'SUPPLIER'){
          window.location.href = '/supplierLogin';
        }
      
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsErr(false)
        console.log(chooseItem,quantity,typeOfNeedService,addingAcomment)

        e.preventDefault()
        const request = {
            chooseItem,quantity,typeOfNeedService,addingAcomment
        }
        await SupplierAPI.createSupplierRequest(request).then((response)=>{
            // Set submitted to true to show confirmation message
            setSubmitted(true)
            setChooseItem('');
            setQuantity('');
            setTypeOfNeedService('');
            setAddingAcomment('');

        }).catch((error)=>{
            setIsErr(true)
            console.log(error)
        })

       
    }

    return (
        <>
            <form className="req" style={{marginTop:'20px', marginBottom:'20px'}} onSubmit={handleSubmit}>
                <h2>Request Order Form</h2>

                <label>Choose Item </label>
                <select value={chooseItem} onChange={(e) => setChooseItem(e.target.value)}>
                <option value="">--Select--</option>
                <option value="Batteries">Batteries</option>
                <option value="Brake Pads">Brake Pads</option>
                <option value="Filters">Filters</option>
                <option value="Tools">Tools</option>
                <option value="polish">polish</option>
                <option value="Soaps">Soaps</option>
                </select>
                <label>Quantity </label>
                <input
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                />
                <label>Type Of Need Service </label>
                <select
                value={typeOfNeedService}
                onChange={(e) => setTypeOfNeedService(e.target.value)}
                >
                <option value="">--Select--</option>
                <option value="Parts sourcing">Parts sourcing</option>
                <option value="Inventory Management">Inventory Management</option>
                 <option value="Technical Support">Technical Support</option>
                </select>
                
                <label>Adding a Comment </label>
                <input
                    type="textarea"
                    onChange={(e) => setAddingAcomment(e.target.value)}
                    value={addingAcomment}
                />
                {/* Conditionally render confirmation message */}
                {submitted && <p style={{textAlign:'center'}}>Thank you for your order!</p>}
                {isErr && <p style={{textAlign:'center',color:'red'}}>Failed to submit your request. Please try again.</p>}

                <button> SUBMIT </button>
            </form>

            
        </>
    )        
}

export default RequestForm
