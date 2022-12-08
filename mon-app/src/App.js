import './App.css';
import AuthUserLogin from './pages/AuthUserLogin/AuthUserLogin';
import AuthUserRegister from './pages/AuthUserRegister/AuthUserRegister';
import Home from './pages/Home/Home';
import {Layout, Menu, Button, Space} from 'antd';
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
const { Header, Content, Footer } = Layout;

function App() {
  const [user, setUser] = useState({});

  useEffect(() =>{
    setUser(JSON.parse(localStorage.getItem('user')));
  }, {})

  console.log(user)
  return(
    <>
      <Layout>
        <Header class='navbar'>
          <Link to={"/home"}>
            <div class='logo'>
            </div>
          </Link>
          <Menu>
            
          </Menu>
          <div>
            { user===null ?(
                <Space>
                <Link to={"/login"}>
                  <Button type='primary' shape="round" size={'large'}>S'identifier</Button>
                </Link>
                <Link to={"/register"}>
                  <Button shape="round" size={'large'}>Créer un compte</Button>
                </Link>
              </Space>
            ) : (
              <Link to={"/profil"}>
                  <Button type='primary' shape="round" size={'large'}>Profil</Button>
              </Link>
            )}
          </div>
        </Header>
        <Content class="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<AuthUserLogin/>}/>
            <Route path="/register" element={<AuthUserRegister />} />
            <Route path="*" element={<Home/>} />
          </Routes>
        </Content>
        <Footer class="footer">
          Shifumi ©2022 Created 
        </Footer>
      </Layout>
    </>
  );
}

export default App;
