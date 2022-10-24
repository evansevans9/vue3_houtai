import axios from "axios";
import config from "../config/index"

import { ElMessage } from "element-plus";
import router from "../router";
import { promiseTimeout } from "@vueuse/shared";


const TOLEN_ERROR = 'token认证失败，重新登录'
const NETWORK_WORK = "网络异常，稍后再试"
const instance = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
  }); 


instance.interceptors.request.use((req)=>{
    const header = req.headers

    if(!header.Authorization) header.Authorization = 'Jason'
    return req
});

instance.interceptors.response.use((res)=>{
    const { code,data,mes }  = res.data
    if(code == 200){
        return data
    }else if(code == 40001){
        ElMessage.error(TOLEN_ERROR)
        setTimeout(()=>{
            router.push('login')
        })
        return Promise.reject(TOLEN_ERROR)
    }else{
        ElMessage.error(NETWORK_WORK)
        return Promise.reject(NETWORK_WORK)
    }
});



// request函数
function request(options){
    options.method = options.method || 'get'
    
    if(options.method.toLowerCase() === 'get'){
        // 统一属性是data
        options.params = options.data
    }

    // 。。。。。
    if(config.env === 'prod'){
        instance.defaults.baseURL  = config.baseApi
    }else{
        instance.defaults.baseURL  = config.mock ? config.mockApi : config.baseApi
    }
    return instance(options)
}


['get','post','put','delete','patch'].forEach((item)=>{
    request[item] = (url,data,options)=>{
        return request({
            url,data,method:item,...options
        })
    }
})

export default request