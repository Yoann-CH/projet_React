import "../../App.css";
import { Divider } from 'antd';
import MatchsList from "../../components/MatchsList/MatchsList";

const Matchs = () => {
    return (
        <div class="container">
            <h1>Matchs</h1>
            <Divider/>
            <MatchsList/>
        </div>
    )
}

export default Matchs;