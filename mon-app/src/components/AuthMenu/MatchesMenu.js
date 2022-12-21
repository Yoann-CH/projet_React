
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";
import "../../App.css";

const MatchesMenu = () => {

    const [user, setUser] = useState({});

    useEffect(() =>{
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
    }, [])

    return(
        user === null ?(    
            <div></div>
        ) : (
            <Link to={"/matches"} class="matches-menu">
              <Button type='primary' shape="round" size={'large'}>Matches</Button>
            </Link>
        )
    )
}

export default MatchesMenu;