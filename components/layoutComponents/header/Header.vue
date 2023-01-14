<script setup>
const userprofile = ref([
  {
    title: "My Profile",
    desc: "Account Settings",
  },
  {
    title: "My Inbox",
    desc: "Messages & Emails",
  },
  {
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
  },
]);
</script>

<template>
  <v-menu anchor="bottom end" origin="auto" min-width="300">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="pa-0 px-1"
        elevation="0.0"
        color="transparent"
        plain
        :ripple="false"
      >
        <v-avatar size="35">
          <img src="/images/users/3.jpg" width="35" alt="Julia" />
        </v-avatar>
      </v-btn>
    </template>

    <v-list class="pa-6" elevation="10" rounded="lg">
      <v-list-item
        class="pa-3 mb-2"
        v-for="(item, i) in userprofile"
        :key="i"
        :value="item"
        :title="item.title"
        :subtitle="item.desc"
        rounded="lg"
      >
      </v-list-item>
      <v-btn @click="Logout" block color="success" variant="tonal" class="mt-4 py-4"
        >Logout</v-btn
      >
    </v-list>
  </v-menu>
</template>
<style>
.v-btn:hover:before {
  background-color: transparent;
}
</style>

<script>
import axios from "axios";
import {BASE_URL} from "~/constants";
import {useRouter} from "nuxt/app";

export default {
  name: "header",
  data() {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    Logout()
    {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      axios.post(BASE_URL+"/api/auth/logout").then(response =>{
        const router = useRouter();
        router.push({ path: "/auth/login" });
      });
    }
  }
}
</script>