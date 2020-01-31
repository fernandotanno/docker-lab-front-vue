import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:3333/'
// axios.defaults.headers.common['Authorization'] = 'abc123'
// axios.defaults.headers.get['Accepts'] = 'application/json'


Vue.use({
    install(Vue) {
        //Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'http://127.0.0.1:3333/',
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImRhdGEiOnsidXNlcm5hbWUiOiJVc2VyIERlZmF1bHQiLCJlbWFpbCI6ImFwaUBhcGkuY29tIiwiYWNjZXNzIjoibWFuYWdlciJ9LCJpYXQiOjE1ODA0MTUxMDEsImV4cCI6MTU4MDUwMTUwMX0.imJEtZ5yJVE577LniagVzfQ-mZGfj6JFX8rkB5WXk0Y"
            }

        })
    }
})