<template>
  <div style="background: #f5f4f4; width: 100%; height: 100%; padding-bottom: 10px; padding-top: 10px;">
<v-container style="display: flex; justify-content: center; align-items: center; margin-top: 160px; padding-bottom: 10px">
  <v-card width="600" >
<v-card-text align="center" style="font-size: 32px; font-weight: bold">Login</v-card-text>
    <div style="display: flex; justify-content: center; position: absolute; top: -121312321342px">
      <v-alert class="" style="margin-left: 10px;margin-right: 10px" type="error" variant="outlined">
      test
      </v-alert>
    </div>
   <form @submit.prevent="login">
     <v-col style="margin-left: 80px">
       <label class="text-lable"><span class="text-red">*</span>Email:</label>
       <div style="align-items: center"><input class="inp" type="email" name="email" placeholder="Email" v-model="email" required></div>
     </v-col>
     <v-col style="margin-left: 80px">
       <label class="text-lable"><span class="text-red">*</span>Password:</label>
       <div style="align-items: center"><input class="inp" type="password" name="password" placeholder="Password" v-model="password" required></div>
     </v-col>
     <v-col align="center">
       <v-btn width="420" elevation="0" color="success" @click.prevent="login">Login</v-btn>
     </v-col>
   </form>
  </v-card>
</v-container>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";
import {useUserStore} from "../../stores";
// import {useUserStore} from "../../stores";

definePageMeta({
  layout: "blank",
});
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      //
      const someStore = useUserStore()
      //
      // // this subscription will be kept even after the component is unmounted
      someStore.Login(this.email, this.password)
    }
  }
}
</script>

<style scoped>
.inp{
  padding-left: 10px;
  height: 50px;
  width: 420px;
  border: 2px solid #dedede;
  border-radius: 15px;
}
.text-lable{
  font-size: 18px;
}
</style>