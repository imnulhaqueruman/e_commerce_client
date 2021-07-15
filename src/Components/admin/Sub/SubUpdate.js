import React,{useState,useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import { useSelector } from 'react-redux';
import{getCategories} from '../../../functions/Category';
import {
    getSub,
    updateSub} from '../../../functions/sub.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useHistory, useParams,useRouteMatch } from "react-router-dom";
import CategoryForm from '../../forms/CategoryForm';

const SubUpdate = () => {

    const history = useHistory();
    const {slug} = useParams();
    const match = useRouteMatch("/adminSub/:slug");

    const{user} = useSelector((state) =>({...state}))

    const[name,setName] = useState('')
    const[loading,setLoading] = useState(false)

    const[categories,setCategories] = useState([])
    const[parent,setParent] = useState("")

    // searching and filtering
    //const[keyWord,setKeyWord] = useState('')

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);
    
    const loadCategories = () =>{
        getCategories().then((res) => setCategories(res.data));
        console.log('call back call')
     }
     const loadSub = () =>{
        getSub(match.params.slug).then((s) =>{
            setName(s.data.name)
            setParent(s.data.parent)
        });
        console.log('call back call')
     }



    const handleSubmit = (e) =>{
           e.preventDefault();
           //console.log(name);
           setLoading(true);
           updateSub(match.params.slug,{name,parent}, user.token)
                .then(res =>{
                    setLoading(false)
                    //console.log(res.data)
                    setName("")
                    toast.success(`"${res.data.name}" is Updated`)
                    history.push('/admin/sub')
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
            removeSub(slug, user.token)
              .then((res) => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                loadSubs();
              })
              .catch((err) => {
                if (err.status === 400) {
                  setLoading(false);
                  toast.error(err.response.data);
                }
              });
          }
    }*/
   
    //step 4
    //const searched = (keyWord) => (c) => c.name.toLowerCase().includes(keyWord)
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>

                 <div className="col">
                   {loading?<h4 className="text-danger">
                       Loading..</h4>:
                       <h4>Update SubCategory</h4>
                    }
                    <div className="form-group">
                        <label>Parent Category</label>
                        <select name="category"
                         className="form-control" 
                         onChange={(e) => setParent(e.target.value)}
                        >
                         {categories.length > 0 && 
                          categories.map((c) =>
                             <option key={c._id}
                              value={c._id} selected={c._id === parent}>
                              {c.name}
                              </option>
                         )}
                        </select>

                    </div>
                    

                   <CategoryForm 
                    handleSubmit={handleSubmit}
                    name={name} 
                    setName={setName} 
                    />
                    {/* step 2 and step 3 */}
                  
                    

                   <hr/>
                   {/* step5 */}
                   
                 </div>
            </div>
            
        </div>
    );
};

export default SubUpdate;