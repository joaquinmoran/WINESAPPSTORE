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
                return response;
            });
    }

    signin(userName, email, age, password) {
        return axios 
            .post(
                API_URL + '/create_user',
                {
                    userName,
                    email,
                    age,
                    password,
                }
            )
            .then((response) => {
                console.log('created.');
                return response;
            });
    }

    getWinesList() {
        return axios 
            .get(
                API_URL + '/list_wines',
                {

                },
            )
            .then((response) => {
                console.log('succesful.' + response.data);
                return response;
            })
    }
}

export default new WinesAppService();