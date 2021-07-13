import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {getCategory,updateCategory} from '../../../functions/Category';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {EditOutlined,DeleteOutlined} from"@ant-design/icons";
import { useHistory, useParams,useRouteMatch } from "react-router-dom";
import CategoryForm from '../../forms/CategoryForm';
const CategoryUpdate = () => {
    const history = useHistory();
    const {slug} = useParams();
    const match = useRouteMatch("/admin/:slug");
    const{user} = useSelector((state) =>({...state}))

    const[name,setName] = useState('')
    const[loading,setLoading] = useState(false)


    useEffect(() => {
      loadCategory();
      console.log(match)
    }, []);
  
    const loadCategory = () =>{
      getCategory(match.params.slug)
      .then((c) => setName(c.data.name));
    }



    const handleSubmit = (e) =>{
           e.preventDefault();
           //console.log(name);
           setLoading(true);
           updateCategory(match.params.slug, {name}, user.token)
                .then(res =>{
                    setLoading(false)
                    //console.log(res.data)
                    setName("")
                    toast.success(`"${res.data.name}" is Updated`)
                    history.push('/admin/category')
                    //loadCategories();
                })
                .catch(err =>{
                    setLoading(false)
                    //console.log(err.response.data);
                    if(err.status === 400){
                        toast.error(err.response.data);
                    }
                    
                    
                })
    }
    /*const handleRemove = async(slug) =>{
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token)
              .then((res) => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                loadCategories();
              })
              .catch((err) => {
                if (err.status === 400) {
                  setLoading(false);
                  toast.error(err.response.data);
                }
              });
          }
    }*/
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>

                 <div className="col">
                   {loading?<h4 className="text-danger">Loading..</h4>:<h4>Update Category</h4>}
                   <CategoryForm 
                   handleSubmit={handleSubmit}
                   name={name} 
                   setName={setName} 
                    />
                   <hr/>
                   
                 </div>
            </div>
            
        </div>
    );
};

export default CategoryUpdate;