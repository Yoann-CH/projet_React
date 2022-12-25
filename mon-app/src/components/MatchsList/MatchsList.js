import { List, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MatchsService from "../../services/MatchsService";



const MatchsList = () => {
    const [matchs, setMatchs] = useState([]);
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
        MatchsService.getAllMatchs(user.token).then((result =>{
            setMatchs(result);
        }));
    })

    const createMatch = () =>{
        MatchsService.createMatch(user.token).then((result) =>{
            if(result.match){
                openNotificationMatchError('topRight');
            }else{
                navigate("/match/"+result._id) 
            }
        })
    }

    function join(){
        navigate("/match/"+this) 
    }

    return(
        <>
            {contextHolder}
            <List 
            header = {<div>Vous pouvez retrouver ici tout les matchs aux quelles vous avez pu jouer. Si vous cliquez sur le bouton à droite vous rejoindrez un match déjà créé d'un autre joueur sinon un match sera créé en l'attente d'un autre joueur.<Button style={{margin:'10px'}} onClick={createMatch.bind()} size={'large'} type="primary">Jouer</Button></div>}
            bordered
            size="large"
            dataSource={matchs}
            renderItem={(item) => (
                <List.Item style={{display: 'flex'}}>
                <div>
                    <div>
                        joueur 1 : {item.user1.username}
                    </div>
                    <div>
                        {item.user2 === null ?(<>joueur 2 : en attente</>) : (<>joueur 2 : {item.user2.username}</>)}
                    </div>
                    <div>
                        {
                            item.winner === undefined ?(<></>) : 
                            item.winner === null ?(<h3>Egalité</h3>) : (<h3> Gagnant :{item.winner.username}</h3>)
                        }
                    </div>
                </div>
                <Button onClick={join.bind(item._id)}>{
                    item.winner === undefined ?(<>Rejoindre</>) : (<>Voir</>)
                }</Button>
                </List.Item>
            )}
            />
        </>
    )
}

export default MatchsList;