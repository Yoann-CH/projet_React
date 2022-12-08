
import { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { Link } from "react-router-dom";
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AuthMenu = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() =>{
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
    }, [])

    const BtnLogout = () =>{
        AuthService.logout(user.id).then(()=>{
            navigate('/login');
            window.location.reload();
        })
    }

    console.log(user)
    return(
        user === null ?(
            <Space>
            <Link to={"/login"}>
              <Button type='primary' shape="round" size={'large'}>S'identifier</Button>
            </Link>
            <Link to={"/register"}>
              <Button shape="round" size={'large'}>Créer un compte</Button>
            </Link>
          </Space>
        ) : (
            <Space>
                <Link to={"/profil"}>
                    <Button type='primary' shape="round" size={'large'}>Profil</Button>
                </Link>
                <Link>
                    <Button type='primary' shape="round" size={'large'} onClick={BtnLogout}>Déconnexion</Button>
                </Link>
            </Space>
        )
    )
}

export default AuthMenu;