import axios from "axios";


const APIclient = {
    async getData(){
        return axios.get('http://216.93.149.93:3000/report/newest')
        .then((res) => {
            return res
        }).catch((err) => {
            console.log(err); 
            return[{"id": "0", "Type":"Grey Birch", "LocationX":"44.4859","LocationY":"-73.2129","Description":"Wow really nice trees here apples","Miles":"17", "Image":"https://bplant.org/photos/u/26c0460582144d3aa14363d8a0fd6b50-sq-330.jpg"}]
        })
    },

    getImage(id){
        axios.get('http://216.93.149.93:3000/image/'+id)
        .then((res) => {
            console.log(res.data);
            return res
        }).catch((err) => {
            console.log(err); 
            return[]
        })
    }
}

export default APIclient;