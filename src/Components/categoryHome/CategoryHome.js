import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import{getCategory} from '../../functions/Category';

const CategoryHome = () => {
    const{slug} = useParams()

    const[category,setCategory] = useState({})
    const[products,setProducts] = useState([])
    const[loading,setLoading] = useState(false)

    useEffect(() =>{
        setLoading(true)
        getCategory(slug).then(c =>{
            console.log(JSON.stringify(c.data,null,4))
            setCategory(c.data)
            
        })
    },[])
    return (
        <div>
            {slug}
        </div>
    );
};

export default CategoryHome;