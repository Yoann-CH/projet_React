import AuthUserForm from "../../components/AuthUserForm/AuthUserForm"
import "../../App.css";
import { Divider } from 'antd';

const AuthUserLogin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getallUsers().then((data) => {
        setUsers(data);
        });
    }, [])

    return (
        <div class="container">
            <h1>Formulaire d'authentification</h1>
            <Divider/>
            <AuthUserForm login={true}/>
        </div>
    )
}
export default AuthUserLogin;