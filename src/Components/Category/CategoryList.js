import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import{getCategories} from '../../functions/Category';

const CategoryList = () => {
    const[categories,setCategories] = useState([])
    const[loading,setLoading] = useState(false)

    useEffect(() =>{
        setLoading(true)
        getCategories().then(c =>{
            console.log('categories',c)
            setCategories(c.data)
            setLoading(false)
        })
    },[]);
    return (
        <div className="container">
            <div className="row">
               {loading ? <h4 className="text-center">Loading...</h4> : 
                    categories.map((c) =>
                        <div key={c._id} className=" col btn btn-outline-primary btn-lg btn-block  m-3">
                                <Link to={`/category/${c.slug}`}>{c.name}</Link>
                        </div>  )   
               }
            </div>
        </div>
    );
};

export default CategoryList;