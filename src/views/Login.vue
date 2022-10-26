<script>
import { User,View } from '@element-plus/icons-vue'
  export default{
    name:"login",
    data(){
      return{
          user:{
              userName:"",
              userPwd:""
          },
          rules:{
             userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          }
      }
    },
    methods: {
      login(){
        this.$refs.loginForm.validate((val)=>{
            // console.log(val)
        if(val){
          this.$api.login(this.user).then((res)=>{
        console.log(res,1111)
        this.$store.commit('saveuserInfo',res)
        this.$router.push('/welcome')
       })

        }
        })
    
      }
    },
    computed:{
      User1(){
        return User
      },
      View(){
        return View
      }
    },
    mounted() {
      // this.$request({
      //   method:'get',
      //   url:'/login',
      //   data:{
      //     name:'jason'
      //   }
      // }).then(res=>{
      //   console.log(res)
      // })
      // this.$request.get('/login',{name:'jason'},{mock:true},).then(res=>{
      //   console.log(res)
      // })

      // this.$storage.setItem('user',{name:'zhuming',age:26})
      // console.log(this.$storage.getItem('user'))
    },
  }
</script>

<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="user" :rules="rules" status-icon ref="loginForm">
        <div class="title">请登录</div>
        <el-form-item prop="userName">
            <el-input v-model="user.userName" placeholder="请输入"  :suffix-icon="User1" type="text" />
        </el-form-item>
        <el-form-item prop="userPwd">
            <el-input v-model="user.userPwd" placeholder="请输入"  :suffix-icon="View" type="password"/>
        </el-form-item>
        <el-form-item>
             <el-button type="primary" class="btn-login" @click="login">Primary</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
