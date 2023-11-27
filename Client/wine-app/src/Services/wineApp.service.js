import axios from "axios";
import { json } from "react-router-dom";


const API_URL = 'http://localhost:3001';

class WinesAppService {

    login(userName, password){
        return axios
            .post(
                API_URL + '/login',
                {
                    userName,
                    password,
                },
            )
            .then((response) => {
                console.log(response.data);
            });
    }
}

export default new WinesAppService();