<template>
  <div class="d-flex justify-content-center main">
    <div class="backF">
      <form method="post" @submit.prevent="Login">
        <div class="d-flex align-items-center justify-content-center aa">
          <p class="titlelogin">ADMIN || TALLOSFLIX</p>
        </div>
        <div>
          <div class="inputPosition loginInfo">
            <input
              type="email"
              class="input"
              placeholder="exemplo: admin@gmail.com"
              v-model="usuario.email"
            />
            <mail-icon size="1.5x" class="custom-class lock"></mail-icon>
          </div>
          <div class="inputPosition loginInfo">
            <input
              type="password"
              class="input"
              placeholder="exemplo: senha"
              v-model="usuario.password"
            />
            <lock-icon size="1.5x" class="custom-class lock"></lock-icon>
          </div>
        </div>
        <div class="butao pt-4">
          <button type="submit" class="btn-login custom-class">Login <log-in-icon size="1.5x" class="custom-class"/></button>
           
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import {
  UserIcon,
  MailIcon,
  LockIcon,
  ArrowRightIcon,
  LogInIcon
} from "vue-feather-icons";
export default {
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    Login() {
      this.$store.dispatch('Login', this.usuario).then(()=>{
        this.$router.push({ name: "Overview" })
      })
    },
  },
  components: {
    UserIcon,
    MailIcon,
    LockIcon,
    ArrowRightIcon,
    LogInIcon
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
  background-repeat: no-repeat;
  background-image: url("../../../public/img/cinema.jpg");
  background-size: 100%;
}
.backF {
  width: 30%;
  background-color: rgba(32, 31, 31, 0.836);
}
.titlelogin {
  color: white;
  font-size: 25px;
  padding-top: 10%;
  padding-bottom: 10%;
}
.email {
  width: 44px;
  font-size: 14px;
  left: 11%;
  top: 15%;
  background-color: white;
  position: absolute;
  border-right: solid 2px #000;
  color: #000;
}
.lock {
  width: 44px;
  font-size: 14px;
  left: 11%;
  top: 15%;
  background-color: white;
  position: absolute;
  border-right: solid 2px #000;
  color: #000;
}
.aa {
  padding-top: 23%;
}
.butao {
  width: 40%;
  margin-left: 29%;
}
.btn-login{
  width: 100%;
  color: white;
  background-color: rgb(22, 19, 19);
  border: 1.5px solid whitesmoke;
  border-radius:10px ;
}
.btn-login:hover{
  width: 100%;
  color: #000;
  background-color: #000;
  border-color: rgb(22, 19, 19);
  border-radius:10px ;
}
.btn-login:hover{
  background-color: whitesmoke;
}
.input {
  display: flex;
  border-radius: 10px;
  border: 2px solid #110729;
  margin-bottom: 20px;
  margin-left: 10%;
  height: 35px;
  width: 80%;
  font-size: 12px;
}
.input:focus {
  font-size: 12px;
  color: black;
  background-color: whitesmoke;
}
.inputPosition {
  position: relative;
}
.loginInfo input[type="email"],
input[type="password"] {
  padding-left: 50px;
}
</style>