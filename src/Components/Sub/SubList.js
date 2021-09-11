import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import{getSubs} from '../../functions/sub';

const SubList = () => {
    const[subs,setSubs] = useState([])
    const[loading,setLoading] = useState(false)

    useEffect(() =>{
        setLoading(true)
        getSubs().then(c =>{
            console.log('categories',c)
            setSubs(c.data)
            setLoading(false)
        })
    },[]);
    return (
        <div className="container">
            <div className="row">
               {loading ? <h4 className="text-center">Loading...</h4> : 
                    subs.map((s) =>
                        <div key={s._id} className=" col btn btn-outline-success btn-lg btn-block  m-3">
                                <Link className="text-dark" to={`/sub/${s.slug}`}>{s.name}</Link>
                        </div>  )   
               }
            </div>
        </div>
    );
};

export default SubList;