import React, { useState } from 'react';
import { Menu,Badge } from 'antd';
import {AppstoreOutlined, SettingOutlined,ShoppingCartOutlined,ShoppingOutlined, UserAddOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search';

const { SubMenu } = Menu;
const Header = () => {
    const [current,setCurrent] = useState('home')

    let dispatch = useDispatch();
    let history = useHistory()
    const {user,cart} = useSelector((state) =>({ ...state
    }))
    console.log('user data', user)
    const handleClick = (e) =>{
        //console.log(e.key)
        setCurrent(e.key)
    }
    const logOut = () =>{
      firebase.auth().signOut()
      dispatch({
        type:'LOGOUT',
        payLoad:null
      })
      history.push('/login')

    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined/>}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="shop" icon={<ShoppingOutlined/>}>
          <Link to="/shop">Shop</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
          <Link to="/shop">
            <Badge count={cart.length} offset={[9,0]}>
              Cart
            </Badge>
          </Link>
        </Menu.Item>

        {!user && <Menu.Item key="register" icon={<UserAddOutlined/>} className="float-end">
          <Link to="/register">Register</Link>
        </Menu.Item>
        }
        {!user && <Menu.Item key="login" icon={<UserOutlined/>} className="float-end">
          <Link to="login">Login</Link>
        </Menu.Item>
        }
    
        {user && <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-end">
            {user && user.role ==="subscriber"&&(<Menu.Item>
              <Link to = "/user/history">Dashboard</Link>
            </Menu.Item>)}
            {user && user.role ==="admin"&&(<Menu.Item>
              <Link to = "/admin/dashboard">Dashboard</Link>
            </Menu.Item>)} 
            <Menu.Item icon={<LogoutOutlined />} onClick={() => logOut()}>Logout</Menu.Item>
        </SubMenu>
        }
       
       <Menu.Item key="Search" className="float-end">
        <span>
          <Search/>
        </span>
       </Menu.Item>
      </Menu>
    );
};

export default Header;