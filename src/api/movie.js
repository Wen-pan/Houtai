import axios from 'axios'

function getmovieList(data) {
    var url=' http://www.bufantec.com/api/douban/movie/in_theaters?start='+data+'&limit=5';
    return axios.get(url)
}

export default {
    getmovieList
}