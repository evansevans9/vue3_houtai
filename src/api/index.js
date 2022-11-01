import request from "../utils/request";
export default{
    login(params){
        return request({
            url:'/users/login',
            method:'post',
            data:params,
            mock:false
        })
    },
    menulist(){
        return request({
            url:'/menu/list',
            method:'get',
            data:{},
            // mock:true
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
            mock:false
        })
    },
    userDelete(params){
        return request({
            url:'/users/delete',
            method:'post',
            data:params,
            // mock:true
        })
    },
    getrouleslist(params){
        return request({
            url:'/roles/allList',
            method:'get',
            data:params,
            mock:true
        })
    },
    getdeptlist(params){
        return request({
            url:'/dept/list',
            method:'get',
            data:params,
            mock:true
        })
    },
    getoperate(params){
        return request({
            url:'/users/operate',
            method:'post',
            data:params,
            // mock:true
        })
    },
    menuSubmit(params){
        return request({
            url:'/menu/operate',
            method:'post',
            data:params,
            // mock:true
        })
    },
    rolelist(){
        return request({
            url:'/roles/list',
            method:'get',
            // data:params,
            mock:true
        })
    },
    roleoperate(params){
        return request({
            url:'/roles/operate',
            method:'post',
            data:params,
            mock:true
        })
    }

}