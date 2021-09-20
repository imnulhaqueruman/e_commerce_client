import React,{useState,useEffect} from 'react';
import{getProductsByCount,fetchProductsByFilter } from '../functions/Product';
import {useSelector,useDispatch} from 'react-redux';
import ProductCard from './Cards/ProductCard';
import {Menu,Slider,Checkbox} from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import{getCategories} from '../functions/Category';
import{getSubs} from '../functions/sub';
import Star from '../Components/forms/Star';

const {SubMenu,ItemGroup} = Menu;
const Shop = () => {
    const[products,setProducts] = useState([]);
    const[loading,setLoading] = useState(false);
    const[price,setPrice] = useState([0,0]);
    const[ok,setOk] = useState(false);
    const[categories,setCategories] = useState([]);
    const[categoriesIds,setCategoriesIds] = useState([])
    const[star,setStar] = useState('')
    const[subs,setSubs] = useState([])
    const[sub,setSub] = useState('')

    let dispatch = useDispatch() ;
    let {search} = useSelector((state) =>({...state}));

    const {text} = search;

    useEffect(() =>{
        loadAllProducts()
        //fetch categories product
        getCategories().then((res) => setCategories(res.data))
        // fetch subCategories 
        getSubs().then((res) => setSubs(res.data))
    },[])
// 1. load default products by default on page load 
    const fetchProducts = (arg) =>{
        fetchProductsByFilter(arg).then(res =>{
            setProducts(res.data);
        })
    };
    
    const loadAllProducts = () =>{
        getProductsByCount(12).then(p =>{
            setProducts(p.data);
            setLoading(false)
        });
    }
// 2.load Products on user search input 
    useEffect(() =>{
      const delayed = setTimeout(() =>{
        fetchProducts({query:text});
      },300)
      return () => clearTimeout(delayed);

    },[text]);

  
// 3. load products based on price ranges 
    useEffect(() =>{
     console.log('ok to request');
     fetchProducts({price});
    },[ok]);

    const handleSlider = (value) =>{
        dispatch({
            type:"SEARCH_QUERY",
            payLoad:{text:""},
        })
        // reset
        setCategoriesIds([]);
        setPrice(value);
        setStar("")
        setSub('')
         setTimeout(() =>{
             setOk(!ok)
         },300)
    }
    // 4.load products based on categories 

    // handle check for categories 
    const handleCheck= e =>{
        dispatch({
            type:"SEARCH_QUERY",
            payLoad:{text:""},
        })
        // reset 
        setPrice([0,0]);
        setSub('')
        setStar("")
       //console.log(e.target.value)
       let inTheState = [...categoriesIds];
       let justChecked = e.target.value;
       let foundInTheState = inTheState.indexOf(justChecked) // index / - 1

       // if not found returns -1 else returns index 
          if(foundInTheState === -1){
              inTheState.push(justChecked)
          } else{
              // if found pull out item from index
              inTheState.splice(foundInTheState,1);
          }
        setCategoriesIds(inTheState);
        //console.log(inTheState);
        fetchProducts({category:inTheState})
    };
    // 5 Show products by star ratings 
      const handleStarClick = (num) =>{
          // 
          //console.log(num)
            dispatch({
                type:"SEARCH_QUERY",
                payLoad:{text:""},
            })
          setPrice([0,0]);
          setSub('')
          setCategoriesIds([])
          setStar(num)
          fetchProducts({stars: num})
      };
    //6 show products by sub category
    const handleSubs =  (sub) =>{
       // console.log('subs', s)
       setSub(sub)
        dispatch({
            type:"SEARCH_QUERY",
            payLoad:{text:""},
        })
        setPrice([0,0]);
        setCategoriesIds([])
        setStar("")
        fetchProducts({sub})

    }
    return (
        <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 pt-2">
                  <h4>Search/Filter</h4>
                    <hr/>
                  <Menu defaultOpenKeys={['1','2','3','4']} mode="inline">
                      {/* price*/}
                       <SubMenu key='1' title={<span className="h6">
                           <DollarOutlined/> Price
                           </span>
                        }>
                          <div>
                              <Slider className="ms-4 me-4"
                                tipFormatter={(v) => `$${v}`}
                                range
                                value={price}
                                onChange={handleSlider}
                                max="4999"
  
                              />
                          </div>
                       </SubMenu>

                       {/*categories*/}
                       <SubMenu key='2' title={
                           <span className="h6">
                              <DownSquareOutlined/> Categories
                           </span>
                        }>
                          <div style={{marginTop:'-10px'}}>
                              { categories.map((c) =>
                                <div key={c._id}>
                                  <Checkbox
                                  onChange={handleCheck}
                                   className="pb-2 ps-4 pe-4"
                                   value={c._id}
                                   name="category"
                                   checked={categoriesIds.includes(c._id)}
                                   >
                                      {c.name}
                                  </Checkbox>
                                </div>
                               )
                               }
                               
                          </div>
                       </SubMenu>
                       {/* star */}
                       <SubMenu key='3' title={
                           <span className="h6">
                              <StarOutlined/> Rating
                           </span>
                        }>
                          <div style={{marginTop:'-10px'}}>
                                <div className="pe-4 ps-4 pb-2" >
                                    <Star
                                      starClick={handleStarClick}
                                      numberOfStars={5}
                                    />
                                    <Star
                                      starClick={handleStarClick}
                                      numberOfStars={4}
                                    />
                                    <Star
                                      starClick={handleStarClick}
                                       numberOfStars={3}
                                    />
                                    <Star
                                      starClick={handleStarClick}
                                      numberOfStars={2}
                                    />
                                    <Star
                                      starClick={handleStarClick}
                                      numberOfStars={1}
                                    />
                                </div>
                          </div>
                       </SubMenu>
                       {/* subs categories*/}
                       <SubMenu key='4' title={
                           <span className="h6">
                              <DownSquareOutlined/> Sub Categories
                           </span>
                        }>
                          <div style={{marginTop:'-10px'}} className="ps-4 pb-3 pe-4">
                              { subs.map((s) =>
                                <div 
                                  key={s._id} 
                                  className="p-1  m-1 badge bg-secondary"
                                  style={{cursor:'pointer'}}
                                  onClick={() => handleSubs(s)}
                                >
                                  {/* <Checkbox
                                   
                                   className="pb-2 ps-4 pe-4"
                                   value={s._id}
                                   name="category"
                                   checked={categoriesIds.includes(s._id)}
                                   > */}
                                      {s.name}
                                  {/* </Checkbox> */}
                                </div>
                               )
                               }
                               
                          </div>
                       </SubMenu>
                  </Menu>
              </div>
              <div className="col-md-9 pt-2">
                     {loading ? (
                         <h4 className="text-danger">Loading...</h4>
                     ):(
                         <h4 className="text-secondary">Products</h4>
                     )}
                     {
                         products.length < 1 && <p>No products Found</p>
                     }
                     <div className="row pb-5">
                        {products.map((p) =>(
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p}/>
                            </div>
                        ))}
                     </div>
              </div>
            </div>
            
        </div>
    );
};

export default Shop;