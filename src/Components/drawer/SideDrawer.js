import React from 'react';
import{Drawer,Button} from 'antd';
import{useSelector,useDispatch} from 'react-redux';
import laptop from '../../images/laptop.png';

const SideDrawer = ({children}) => {
    // redux
    const dispatch = useDispatch()
    const{user,drawer,cart} = useSelector((state) =>({...state}))
    return (
        <Drawer visible={true}>
            {JSON.stringify(cart)}
        </Drawer>
    );
};

export default SideDrawer;