import { List, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MatchesService from "../../services/MatchesService";



const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [api, contextHolder] = notification.useNotification();

    const openNotificationMatchError = (placement) => {
        api.error({
        message: `Erreur`,
        description: `Vous êtes déjà dans une file d'attente pour jouer.`,
        placement,
        });
    };
    let navigate = useNavigate();

    useEffect(() =>{
        MatchesService.getAllMatches(user.token).then((result =>{
            setMatches(result);
        }));
    },[])

    const createMatch = () =>{
        MatchesService.createMatch(user.token).then((result) =>{
            if(result.match){
                openNotificationMatchError('topRight');
            }else{
                navigate("/match"+"/"+result._id) 
            }
        })
    }

    const join = (id) => {
        navigate("/match"+"/"+id) 
    }

    return(
        <>
            {contextHolder}
            <List 
            header = {<div>Vous pouvez retrouver ici tout les matches aux quelles vous avez pu jouer. Si vous cliquez sur le bouton à droite vous rejoindrez un match déjà créé d'un autre joueur sinon un match sera créé en l'attente d'un autre joueur.<Button onClick={createMatch.bind()}>Jouer</Button></div>}
            bordered
            size="large"
            dataSource={matches}
            renderItem={(item) => (
                <List.Item>
                joueur 1 : {item.user1.username} | joueur 2 : {item.user2.username}
                {
                    item.winner === undefined ?(<></>) : (<> | gagnant :{item.winner.username}</>)
                }
                <Button onClick={join.bind(item._id)}>Rejoindre</Button>
                </List.Item>
            )}
            />
        </>
    )
}

export default MatchesList;