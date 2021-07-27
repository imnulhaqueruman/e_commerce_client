import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Avatar, Badge} from 'antd';

const FileUpload = ({values,setValues,setLoading}) => {
    const{user} = useSelector((state) =>({...state}));


    const fileUploadAndResize = (e) =>{
          //console.log(e.target.files)
          //resize
          const files = e.target.files;
          const allUploadedFiles = values.images;
          if(files){
              setLoading(true)
              for (let i = 0; i < files.length; i++){
                    Resizer.imageFileResizer(
                        files[i],
                         720, 
                         720, 
                        'JPEG',
                        100,
                         0,
                        (uri) =>{  
                        //console.log(uri); 
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`,
                            {image:uri},
                            {
                                headers:{
                                    authtoken: user ? user.token : "",
                                }
                            }
                        )
                        .then(res =>{
                            console.log('IMAGES UPLOAD RES DATA',res.data)
                            setLoading(false)
                            allUploadedFiles.push(res.data);

                            setValues({...values, images: allUploadedFiles});

                        }) 
                        .catch(err =>{
                            setLoading(false)
                            console.log('cloudinary upload error')
                        })
                       },
                     "base64"
                    )
               }
          }

    }
    const handleImageRemove = (public_id) =>{
        setLoading(true)
        //console.log('remove image', id)
        axios.post(`${process.env.REACT_APP_API}/removeimages`, {public_id},{
            headers:{
                authtoken: user ? user.token :"",
            },
          }
        )
        .then(res=>{
            setLoading(false)
            const{images} = values
            const filterImages = images.filter ( (item) =>{
               return item.public_id !== public_id
            });
            setValues({...values,images:filterImages})
        })
        .catch(err =>{
           console.log(err)
           setLoading(false);
           
        })
    }
    return (
        <>
            <div className="row">
              {
                values.images && values.images.map((image) =>
                    <Badge count="x"    key={image.public_id}
                     onClick={() =>handleImageRemove(image.public_id)}
                     style={{cursor:'pointer'}}
                     >
                        <Avatar 
                     
                        src={image.url}
                        size={100}
                        shape="square"
                        className="ml-3"
                    />
                    </Badge>
                   )
              }
            </div>
            <div className="row mt-3">
                <label className="btn btn-secondary btn-raised w-25 mt-3">Choose File
                <input
                type="file"
                multiple
                hidden
                accept="images/*"
                onChange={fileUploadAndResize}
                />
                </label>
            </div>
        </>
    );
};

export default FileUpload;