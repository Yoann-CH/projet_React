import "../../App.css";
import { Divider, Spin, Card, Row, Col, List, notification } from 'antd';
import { useState,useEffect } from "react";
import MatchsService from "../../services/MatchsService";

const Match = () => {
    const [turns, setTurns] = useState(1);
    const [match, setMatchs] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationMatchErrorMoveAlready = (placement) => {
        api.error({
        message: `Erreur`,
        description: `Vous avez déjà choisi votre coup ! Attendez votre adversaire.`,
        placement,
        });
    };

    const openNotificationMatchErrorEnd = (placement) => {
        api.error({
        message: `Erreur`,
        description: `Le match est fini !Vous ne pouvez plus choisir de coup.`,
        placement,
        });
    };

    useEffect(() =>{
        const id = window.location.pathname.split("/match/").join("");
        MatchsService.getMatch(user.token, id).then((result =>{
            setMatchs(result);
            if(result.user2){
                setLoading(false);
                if(result.turns.length === 0){
                    setTurns(1);
                }else{
                    setTurns(result.turns.length);
                }
                if(result.turns[result.turns.length - 1].winner && result.turns.length<3){
                    setTurns(result.turns.length + 1);
                }

            }
        }));
    })

    const chooseRock = () => {
        const id = window.location.pathname.split("/match/").join("");
        MatchsService.chooseMove(user.token, id, turns, "rock").then((result) =>{
            if(result.user ==="move already given"){
                openNotificationMatchErrorMoveAlready('topRight');
            }else if(result.match ==="Match already finished"){
                openNotificationMatchErrorEnd('topRight');
            }
        });
    }

    const choosePaper = () => {
        const id = window.location.pathname.split("/match/").join("");
        MatchsService.chooseMove(user.token, id, turns, "paper").then((result) =>{
            if(result.user ==="move already given"){
                openNotificationMatchErrorMoveAlready('topRight');
            }else if(result.match ==="Match already finished"){
                openNotificationMatchErrorEnd('topRight');
            }
        })
    }

    const chooseScissors = () => {
        const id = window.location.pathname.split("/match/").join("");
        MatchsService.chooseMove(user.token, id, turns, "scissors").then((result) =>{
            if(result.user ==="move already given"){
                openNotificationMatchErrorMoveAlready('topRight');
            }else if(result.match ==="Match already finished"){
                openNotificationMatchErrorEnd('topRight');
            }
        });
    }

    return (
        <div class="container">
            {contextHolder}
            <h1>Match</h1>
            <Divider/>
            {
                match.user2 ?<></> : <p>Vous êtes en attente d'un autre joueur. Veuillez attendre sur cette page.</p>
            }
            <Spin
                size="large" 
                spinning={loading}>
                    <div class="turn-container" >
                        {
                            match.winner === undefined ?(<p class="text-align">Choisissez votre coup puis attendez votre adversaire.</p>) : 
                            match.winner !== null ?(<h2 class="text-align">Le grand gagnant est {match.winner.username}</h2>) : (<h2 class="text-align">Egalité</h2>)
                        }
                        <Row gutter={[16, 16]} class="card-container">
                            <Col span={8}>
                                <Card class="card" bodyStyle={{cursor:'pointer'}} title="Pierre" hoverable="true" onClick={chooseRock}>
                                    <div class="rock"></div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card class="card" bodyStyle={{cursor:'pointer'}} title="Papier" hoverable="true" onClick={choosePaper}>
                                    <div class="paper"></div>
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card class="card" bodyStyle={{cursor:'pointer'}} title="Ciseaux" hoverable="true" onClick={chooseScissors}>
                                    <div class="scissors"></div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    {
                        match.turns && match.turns.length > 0 ?(
                            <div>
                                <List
                                    bordered
                                    size="large"
                                    grid={{ gutter: 16, column: 1 }}
                                    dataSource={match.turns}
                                    renderItem={(item, index) => (
                                        item.winner ?(<List.Item>
                                            <Card title={"Manche "+(index+1)}>
                                                {
                                                    item.winner === "draw" ?(<h3>Egalité</h3>) :
                                                    item.winner === "user1" ?(<h3>Gagnant: {match.user1.username}</h3>) :
                                                    (<h3>Gagnant: {match.user2.username}<br/></h3>)
                                                }
                                                Coup joueur 1: {item.user1}<br/>
                                                Coup joueur 2: {item.user2}<br/>
                                            </Card>
                                            </List.Item>) : (<></>)
                                    )}
                                />
                            </div>
                        ) : <></>
                    }
            </Spin>
        </div>
    )
}

export default Match;