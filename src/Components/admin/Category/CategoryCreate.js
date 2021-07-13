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
import CategoryForm from '../../forms/CategoryForm';
import LocalSearch from '../../forms/LocalSearch';
const CategoryCreate = () => {
    const{user} = useSelector((state) =>({...state}))

    const[name,setName] = useState('')
    const[loading,setLoading] = useState(false)

    const[categories,setCategories] = useState([])

    // searching and filtering
    const[keyWord,setKeyWord] = useState('')

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
   
    //step 4
    const searched = (keyWord) => (c) => c.name.toLowerCase().includes(keyWord)
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>

                 <div className="col">
                   {loading?<h4 className="text-danger">Loading..</h4>:<h4>Create Category</h4>}
                   <CategoryForm 
                    handleSubmit={handleSubmit}
                    name={name} 
                    setName={setName} 
                    />
                    {/* step 2 and step 3 */}
                   <LocalSearch
                    keyWord={keyWord}
                    setKeyWord={setKeyWord}
                     />
                    

                   <hr/>
                   {/* step5 */}
                   { categories.filter(searched(keyWord)).map((c) => (
                    <div className="alert alert-primary" key={c._id}>
                         {c.name}
                          <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-end">
                             <DeleteOutlined className="text-danger"/>
                          </span>
                        <Link to={`/admin/${c.slug}`}>
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