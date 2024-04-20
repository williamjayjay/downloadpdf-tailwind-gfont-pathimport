// const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const URL = 'http://192.168.42.85:3000/candles/10'
import axios from "axios"

export const findCandles = async () => {

    await axios.get(URL)
        .then((response) => {

            return response.data

            // console.log('data', data)


        })
        .catch(error => {
            console.log(error);
            return
        });


}


