import "../../App.css";
import { Divider } from 'antd';
import MatchesList from "../../components/MatchesList/MatchesList";

const Matches = () => {
    return (
        <div class="container">
            <h1>Matches</h1>
            <Divider/>
            <MatchesList/>
        </div>
    )
}

export default Matches;