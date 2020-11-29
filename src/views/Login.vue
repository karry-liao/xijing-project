<template>
  <div class="container" v-loading="loading">
    <div class="login">
      <h3 class="space-lt f-w-n text-center fontsize-22 color-login">
        房屋管理平台
      </h3>
      <el-form
        class="form"
        status-icon
        :model="loginData"
        ref="loginData"
        :rules="rules"
      >
        <el-form-item class="m-t-50" prop="login_account">
          <el-input
            placeholder="请输入用户账号"
            prefix-icon="iconfont saimingtechlogin_user color-login"
            v-model="loginData.login_account"
            clearable
            ref="myfocus"
          ></el-input>
        </el-form-item>
        <el-form-item class="m-t-50" prop="login_password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont saimingtechlogin_lock color-login"
            v-model="loginData.login_password"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="m-t-50" prop="login_code">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="iconfont saimingtechlogin_test color-login"
            style="width: 170px"
            v-model="loginData.login_code"
          ></el-input>
        </el-form-item>
        <!-- <span class="checkcode">验证码</span> -->
        <div class="code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </el-form>
      <el-button
        type="primary"
        class="loginBtn space-lt fontsize-16"
        @click="login('loginData')"
        >登录</el-button
      >
    </div>

    <footer>
      <p>Copyright(C)2010-2011</p>
      <p>津ICP备12003508</p>
      <p>公安备12003508-15</p>
    </footer>
  </div>
</template>

<script>
import SIdentify from '../components/identify'
export default {
  name: 'login',
  components: {
    's-identify': SIdentify,
  },
  data() {
    // 自定义校验规则 一般在注册时会使用到
    // const validatePass = (rule, value, callback) => {
    //   const patt = /^(?!bai[0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else if (!patt.test(value)) {
    //     callback(new Error('6-12数字字母组成!'))
    //   } else {
    //     callback()
    //   }
    // };
    const validateCode = (rule, value, callback) => {
      console.log(value, typeof value)
      value = value.toUpperCase()
      if (value != this.identifyCode) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      identifyCodes: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      identifyCode: '',
      loginData: {
        login_account: '',
        login_password: '',
        login_code: '',
      },
      rules: {
        login_account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '请检查手机号码是否正确',
            trigger: 'blur',
          },
        ],
        login_password: [
          //自定义验证规则，密码长度6-9位，数字字母组成
          //{ validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        login_code: [{ validator: validateCode, trigger: 'blur' }],
      },
      loading: false
    }
  },
  methods: {
    // 自己使用原生书写的验证码
    // checkcode() {
    //   var str = 'abcdedghigklmnopqrstuvwxyz'
    //   str = str.concat('0123456789', str.toUpperCase())
    //   //console.log(str)
    //   //随机获取四个
    //   var arr = str.split('')
    //   //console.log(arr)
    //   //获取随机索引
    //   // var ranIdx = parseInt(Math.random() * arr.length)
    //   //console.log(ranIdx)
    //   //通过随机索引获取随机字符
    //   //console.log(arr[ranIdx])
    //   var ranCode = ''
    //   for (var i = 0; i < 4; i++) {
    //     var ranIdx = parseInt(Math.random() * arr.length)
    //     // console.log(arr[ranIdx])
    //     ranCode+=arr[ranIdx]
    //   }
    //   console.log(ranCode)
    // },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    // 登录
    login(formName) {
      // 通过 this.$refs[formName] 拿到表单的引用
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true;
          const res = await this.$http.post('/user_login/Login',{
            "login_account": this.loginData.login_account,
            "login_password": this.loginData.login_password
          });
          console.log(res)
          if(res.status == 200){
            // 存储token
            sessionStorage.token = res.data.ResultList[0].Token;
            this.$message({
              message: '恭喜你，登录成功！',
              type: 'success'
            });
            // 编程式导航进行跳转
            this.$router.push('/home')
            this.loading = false;
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    // 获取焦点  原因是：使用element-ui的input渲染后外层包裹的标签影响所以需要通过 ref 属性指向标签引用 在js代码中使用 this.$refs.ref指定的引用对象调用focus方法
    this.$refs.myfocus.focus()
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  min-width: 1280px;
  background: url(../assets/image/login_bg@2x.jpg);
  background-size: cover;
}

.login {
  width: 300px;
  height: 400px;
  padding: 50px 75px;
  background-color: white;

  position: fixed;
  right: 100px;
  top: 16%;
}

.form {
  position: relative;
}

.loginBtn {
  width: 100%;
  background-color: #2f41e7;
}

// .checkcode {
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   width: 110px;
//   background-color: yellow;
//   height: 42px;
// }

.code {
  width: 110px;
  height: 40px;
  //   border: 1px solid red;
  position: absolute;
  right: 0;
  bottom: 0;
}

footer {
  width: 1280px;
  display: flex;
  justify-content: space-around;

  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  color: white;
  font-size: 12px;
}
</style>