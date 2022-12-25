import "../../App.css";
import { Divider, Spin, Card, Row, Col, List } from 'antd';
import { useState,useEffect } from "react";
import MatchesService from "../../services/MatchesService";

const Match = () => {
    const [turns, setTurns] = useState(1);
    const [match, setMatches] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const id = window.location.pathname.split("/match/").join("");
        MatchesService.getMatch(user.token, id).then((result =>{
            setMatches(result);
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
        MatchesService.chooseMove(user.token, id, turns, "rock");
    }

    console.log(match);

    const choosePaper = () => {
        const id = window.location.pathname.split("/match/").join("");
        MatchesService.chooseMove(user.token, id, turns, "paper");
    }

    const chooseScissors = () => {
        const id = window.location.pathname.split("/match/").join("");
        MatchesService.chooseMove(user.token, id, turns, "scissors");
    }

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
                        {
                            match.winner ?(<h2>Le grans gagnant est {match.winner.username}</h2>) : (<p>Choisissez votre coup puis attendez votre adversaire.</p>)
                        }
                        <Row gutter={[16, 16]} class="card-container">
                            <Col span={8} class="turn">
                                <Card class="card" title="Pierre" onClick={chooseRock}>
                                    <div class="rock"></div>
                                </Card>
                            </Col>
                            <Col span={8} class="turn">
                                <Card class="card" title="Papier" onClick={choosePaper}>
                                    <div class="paper"></div>
                                </Card>
                            </Col>

                            <Col span={8} class="turn">
                                <Card class="card" title="Ciseaux" onClick={chooseScissors}>
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
                                                    item.winner === "draw" ?(<>Egalité</>) :
                                                    item.winner === "user1" ?(<>Gagnant: {match.user1.username}<br/></>) :
                                                    (<>Gagnant: {match.user2.username}<br/></>)
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