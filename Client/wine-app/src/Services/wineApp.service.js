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
                const token = response.data.data.token;
                console.log(response.data.data.token);
                axios.defaults.headers.common['auth-token'] = token;
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

    getWinesList(token) {
        return axios 
            .get(
                API_URL + '/list_wines',
                {
                    headers: {
                        Authorization: "Bearer" + `${token}`,
                        "Content-Type": "application/json"
                    }
                },
            )
            .then((response) => {
                console.log('succesful.' + response.data, token) ;
                return response;
            })
    }

    addWineToCart(wineId,token) {
        return axios 
            .post(
                API_URL + '/add_to_cart',
                {   
                    headers: {
                        Authorization: "Bearer" + `${token}`,
                        "Content-Type": "application/json"
                    },
                    wineId,
                }
            )
            .then((response) => {
                return response;
            });
    }

    getWinesFromCart() {
        return axios
            .get(
                API_URL + '/get_cart_wines',
                {},
            )
            .then((response) => {
                console.log('servicedata:', response.data, response.status);
                return response.data;
            });
    }

    deleteWineFromCart(wineId, token) {
        return axios
            .delete(
                API_URL + `/delete_wine_from_cart/${wineId}`,
                {
                    headers: {
                        Authorization: "Bearer" + `${token}`,
                        "Content-Type": "application/json"
                    }
                },   
            )
            .then((response) => {
                console.log('wine deleted.');
                return response;
            })

    }

    saveOrder(token) {
        return axios
            .post(
                API_URL + '/order',
                {
                    headers: {
                        Authorization: "Bearer" + `${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then( 
                (response) => {
                    console.log(response.data);
                }
            )
    }
}

export default new WinesAppService();