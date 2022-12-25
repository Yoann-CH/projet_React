
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";
import "../../App.css";

const MatchsMenu = () => {

    const [user, setUser] = useState({});

    useEffect(() =>{
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
    }, [])

    return(
        user === null ?(    
            <div></div>
        ) : (
            <Link to={"/matchs"} class="matchs-menu">
              <Button type='primary' shape="round" size={'large'}>Matchs</Button>
            </Link>
        )
    )
}

export default MatchsMenu;