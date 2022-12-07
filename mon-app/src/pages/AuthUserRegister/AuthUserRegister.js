import AuthUserForm from "../../components/AuthUserForm/AuthUserForm"
import "../../App.css";
import { Divider } from 'antd';

const AuthUserRegister = () => {
    return (
        <div class="container">
            <h1>Créer un compte utilisateur</h1>
            <Divider/>
            <AuthUserForm/>
        </div>
    )
}
export default AuthUserRegister;