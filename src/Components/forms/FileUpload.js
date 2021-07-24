import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import {useSelector} from 'react-redux';

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
                            console.log('IMAGES UPLOAD RES DATA',res)
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
    return (
        <div className="row">
            <label className="btn btn-secondary w-25">Choose File
            <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
             />
             </label>
        </div>
    );
};

export default FileUpload;