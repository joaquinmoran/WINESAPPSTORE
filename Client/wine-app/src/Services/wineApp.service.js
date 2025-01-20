import axios from "axios";
import { json } from "react-router-dom";


const API_URL = 'http://localhost:3001';


class WinesAppService {

    async login(userName, password){
        try {
            const response =  await axios.post(
                API_URL + '/login',
                {
                    userName,
                    password,
                },
            )
            const token = response.data.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response;
        } catch (error) {
            if(error.response) {
                return error.response
            } else {
                throw new Error("Unexpected error in the request")
            }
        }
    }

    async signin(userName, tel, age, password) {
        return axios 
            .post(
                API_URL + '/create_user',
                {
                    userName,
                    tel,
                    age,
                    password,
                }
            )
            .then((response) => {
                console.log('created.');
                return response;
            });
    }

    async getWinesList(token) {
        return axios 
            .get(
                API_URL + '/list_wines',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                },
            )
            .then((response) => {
                console.log('succesful.' + response.data, token) ;
                return response;
            })
    }

    async addWineToCart(wineId, quantity, token) {
        return axios.post(
            API_URL + `/add_to_cart/${wineId}`,
            {
                quantity
            }, 
            {   
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
            return response;
        });
      
    }

    async getWinesFromCart(token) {
        return axios
            .get(
                API_URL + '/get_cart_wines',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                },
            )
            .then((response) => {
                console.log('servicedata:', response.data, response.status);
                return response.data;
            });
    }

    async deleteWineFromCart(wineId, token) {
        return axios
            .delete(
                API_URL + `/delete_wine_from_cart/${wineId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                },   
            )
            .then((response) => {
                console.log('wine deleted.');
                return response;
            })

    }

    async saveOrder(token) {
        return axios
            .post(
                API_URL + '/order',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then( 
                (response) => {
                    console.log('order:', response);
                    return response;
                }
            )
    }

    async makeContact(msg, total ,token) {
        return axios
            .post(
                API_URL + '/contact-seller',
                {
                    msg,
                    total,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    async getWineById(wineId) {
        return axios
            .get(
                API_URL + `/get_wine/${wineId}`,
                {},
                {
                }
            ).then(
                (response) => {
                    return response;
                }
            )
    }
}

export default new WinesAppService();