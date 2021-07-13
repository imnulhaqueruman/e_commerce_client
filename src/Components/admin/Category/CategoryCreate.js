import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory} from '../../../functions/Category';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {EditOutlined,DeleteOutlined} from"@ant-design/icons";

const CategoryCreate = () => {
    const{user} = useSelector((state) =>({...state}))

    const[name,setName] = useState('')
    const[loading,setLoading] = useState(false)

    const[categories,setCategories] = useState([])

    useEffect(() => {
        loadCategories();
    }, [loading]);
    
    const loadCategories = () =>{
        getCategories().then((res) => setCategories(res.data));
        console.log('call back call')
     }



    const handleSubmit = (e) =>{
           e.preventDefault();
           //console.log(name);
           setLoading(true);
           createCategory({name}, user.token)
                .then(res =>{
                    setLoading(false)
                    //console.log(res.data)
                    setName("")
                    toast.success(`"${res.data.name}" is created`)
                    loadCategories();
                })
                .catch(err =>{
                    setLoading(false)
                    //console.log(err.response.data);
                    if(err.status === 400){
                        toast.error(err.response.data);
                    }
                    
                    
                })
    }
    const handleRemove = async(slug) =>{
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
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>

                 <div className="col">
                   {loading?<h4 className="text-danger">Loading..</h4>:<h4>Create Category</h4>}
                   <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label>Name</label>
                        <input type='text'
                         className="form-control"
                         onChange = {(e) => setName(e.target.value)}
                          value={name}
                          autoFocus
                          required

                          />
                          <br/>
                        <button className="btn btn-outline-primary">Save</button>
                     </div>

                   </form>
                   <hr/>
                   { categories.map((c) => (
                    <div className="alert alert-primary" key={c._id}>
                         {c.name}
                          <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-end">
                             <DeleteOutlined className="text-danger"/>
                          </span>
                         <Link to={`/admin/category/${c.slug}`}>
                            <span className="btn btn-sm float-end">
                                <EditOutlined className="text-warning" />
                            </span>
                         </Link>
                    </div>))}
                 </div>
            </div>
            
        </div>
    );
};

export default CategoryCreate;