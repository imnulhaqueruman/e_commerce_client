import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import{getCategories} from '../../../functions/Category';
import {
    createSub,
    getSub,
    removeSub} from '../../../functions/sub.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {EditOutlined,DeleteOutlined} from"@ant-design/icons";
import CategoryForm from '../../forms/CategoryForm';
import LocalSearch from '../../forms/LocalSearch';
const SubCreate = () => {
    const{user} = useSelector((state) =>({...state}))

    const[name,setName] = useState('')
    const[loading,setLoading] = useState(false)

    const[categories,setCategories] = useState([])
    const[category,setCategory] = useState("")

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
           createSub({name,parent:category}, user.token)
                .then(res =>{
                    setLoading(false)
                    //console.log(res.data)
                    setName("")
                    toast.success(`"${res.data.name}" is created`)
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
    const handleRemove = async(slug) =>{
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeSub(slug, user.token)
              .then((res) => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                //loadCategories();
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
                   {loading?<h4 className="text-danger">
                       Loading..</h4>:
                       <h4>Create SubCategory</h4>
                    }
                    <div className="form-group">
                        <label>Parent Category</label>
                        <select name="category"
                         className="form-control" 
                         onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>Please Select</option>
                         {categories.length > 0 && 
                          categories.map((c) =>
                             <option key={c._id}
                              value={c._id}>
                              {c.name}
                              </option>
                         )}
                        </select>

                    </div>
                    {JSON.stringify(category)}

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
                   {/* categories.filter(searched(keyWord)).map((c) => (
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
                   </div>))*/}
                 </div>
            </div>
            
        </div>
    );
};

export default SubCreate;