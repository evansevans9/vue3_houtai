import request from "../utils/request";
export default{
    login(params){
        return request({
            url:'/users/login',
            method:'post',
            data:params,
            // mock:true
        })
    },
    menulist(){
        return request({
            url:'/menu/list',
            method:'get',
            data:{},
            mock:true
        })
    },
    noticCount(){
        return request({
            url:'/leave/count',
            method:'get',
            data:{},
            mock:true
        })
    },
    getserList(params){
        return request({
            url:'/users/list',
            method:'get',
            data:params,
            mock:true
        })
    }
}