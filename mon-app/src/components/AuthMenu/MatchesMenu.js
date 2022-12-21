
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

const MatchesMenu = () => {

    const [user, setUser] = useState({});

    useEffect(() =>{
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
    }, [])

    return(
        user === null || user.error ?(    
            <div></div>
        ) : (
            <Link to={"/matches"}>
              <Button type='primary' shape="round" size={'large'}>Matches</Button>
            </Link>
        )
    )
}

export default MatchesMenu;