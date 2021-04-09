import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import {adminCreateProduct} from '../api'

const AdminCreateProduct = ({isAdmin}) =>{

    if (!isAdmin ){
        return <Redirect to="/" />
    }else{
        return(
            <div>
            <h1>Add Product</h1>
            </div>
        )
    }
}

export default AdminCreateProduct;