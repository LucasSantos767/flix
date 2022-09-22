<template>
  <div class="d-flex justify-content-center main">
    <div class="backF">
      <form method="post" @submit.prevent="Login">
        <div class="d-flex align-items-center justify-content-center aa">
          <p class="titlelogin">ADMIN</p>
          <user-icon size="3x" class="custom-class user"></user-icon>
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
        <div class="btn pt-4">
          <button type="submit" class="custom-class">Login</button>
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
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
  background-repeat: no-repeat;
  background-image: url("../../../documentation/img/back.jpg");
  background-size: 100%;
}
.backF {
  width: 30%;
  background-color: rgba(32, 31, 31, 0.836);
}
.user {
  color: white;
  margin-left: -17%;
}
.titlelogin {
  color: white;
  font-size: 25px;
  padding-top: 27%;
  margin-left: -5%;
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
.btn {
  width: 40%;
  margin-left: 28%;
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