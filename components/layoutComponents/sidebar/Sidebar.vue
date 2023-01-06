<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="45">
            <img src="/images/users/3.jpg" width="50" alt="Julia" />
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>{{ user.first_name }} {{ user.last_name }}</h5>
        </div>
      </div>
      <v-list class="pa-4">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item :to="item.to" rounded="lg" class="mb-1">
           <div style="display: flex;justify-content: start">
             <div style="padding-right: 10px"><v-icon>{{ item.icon }}</v-icon></div>
             <div v-text="item.title"></div>
           </div>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItems";
import {BASE_URL} from "~/constants";
import axios from "axios";
import {useRouter} from "nuxt/app";

export default {
  name: "sidebar",
  data() {
    return {
      sidebarMenu: ref(sidebarItems),
      user: {},
      token: localStorage.getItem('token')
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get(BASE_URL+`/api/user`).then(response => {
      this.user = response.data
      console.log(this.user)
    }).catch(err => {
      const router = useRouter();
      router.push({ path: "/auth/login" });
      console.log(err);
    });
  }
}
</script>