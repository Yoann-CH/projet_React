import axios from "axios";

const API_URL = "http://localhost:5000/";

class UserService {
    getAllRegister(){
        return axios.get(API_URL + "register");
    }
}

export default new UserService();