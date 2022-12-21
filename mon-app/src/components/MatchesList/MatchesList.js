import { List } from "antd";
import { useEffect, useState } from "react";
import MatchesService from "../../services/MatchesService";



const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() =>{
        MatchesService.getAllMatches(user.token).then((result =>{
            setMatches(result);
        }));
    },[])

    return(
        <List 
        header = {<div>Vous pouvez retrouver ici tout les matches déjà créer par les utilisateurs.</div>}
        bordered
        size="large"
        dataSource={matches}
        renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
    )
}

export default MatchesList;