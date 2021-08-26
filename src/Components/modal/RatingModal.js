import React from 'react';
import {Modal, Button} from 'antd';
import{useSelector} from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const RatingModal =({children}) => {
    let history = useHistory()
    const {user} = useSelector((state) =>({...state}));
    const[modalVisible,setModalVisible] = useState(false);
    
    const handleModal = () =>{
        if(user && user.token){
            setModalVisible(true);
        }
        else{
             history.push('/login')
        }
    }
    return (
        <>
          <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br/> {" "}
                {user ? 'Leave Rating' : 'Login to leave Rating'}
          </div> 
          <Modal title="Leave your rating"
              centered
              visible={modalVisible}
              onOk={() => {
                  setModalVisible(false)
                  toast.success('Thanks for your review.It will apper soon  ')
              }}
              onCancel={() => setModalVisible(false)}
           >
               {children}

          </Modal> 
        </>
    );
};

export default RatingModal;