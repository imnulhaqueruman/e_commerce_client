import React, { useState } from 'react';
import { Menu } from 'antd';
import {AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu } = Menu;
const Header = () => {
    const [current,setCurrent] = useState('home')

    let dispatch = useDispatch();
    let history = useHistory()
    const {user} = useSelector((state) =>({ ...state
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
       
        
      </Menu>
    );
};

export default Header;