import "../../App.css";
import { Divider, Spin } from 'antd';
import { useState,useEffect } from "react";
import MatchesService from "../../services/MatchesService";

const Match = () => {

    const [match, setMatches] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const [value, setValue] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const id = window.location.pathname.split("/match/").join("");
        console.log(id)
        MatchesService.getMatch(user.token, id).then((result =>{
            setMatches(result);
            if(result.user2){
                setLoading(false);
            }
        }));
    })

    return (
        <div class="container">
            <h1>Match</h1>
            <Divider/>
            {
                match.user2 ?<></> : <p>Vous êtes en attente d'un autre joueur. Veuillez attendre sur cette page.</p>
            }
            <Spin
                size="large" 
                spinning={loading}>
                    <div class="turn-container" >

                    </div>
            </Spin>
        </div>
    )
}

export default Match;