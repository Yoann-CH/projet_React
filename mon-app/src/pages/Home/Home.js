import "../../App.css";
import { Divider, Card } from 'antd';
const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div class="container">
            <h1>Jeu Shifumi</h1>
            <Divider/>
            <div class="card-container">
                <Card class="card" headStyle={{textAlign:"center"}} bodyStyle={{ display:"flex", flexDirection:"column", alignItems:"center"}} title="Jouez à Shifumi en ligne !">
                    <p>
                        {
                            user ===undefined ?(<>Sur ce site, vous pourrez jouer à Shifumi en ligne contre des autres joueurs du serveur. Créez vous un compte et identifiez vous pour avoir accès aux matchs et ainsi lancez vos premières parties.</>) :
                            (<>Maintenant authentifié, vous avez accès aux matchs en cliquant sur le bouton "Matchs".</>)
                        }
                    </p>
                    <div class="home-card">
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Home;