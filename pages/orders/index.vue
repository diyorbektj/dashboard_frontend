<template>
<v-card>
  <v-card-text>
    <br />
    <div style="display:flex; justify-content: space-between">
      <div style="font-size: 24px" class="mb-8">Заказы</div>
      <v-btn @click="filter_dialog=true" color="success"><v-icon>mdi-filter</v-icon></v-btn>
    </div>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">№</th>
        <th class="text-left">Username</th>
        <th class="text-left">Phone</th>
        <th class="text-left">Total price</th>
        <th class="text-left">Status</th>
        <th class="text-left">Created_at</th>
        <th class="text-left">View</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in orders" :key="item.name">
        <td>#{{ item.id }}</td>
        <td>{{ item.user_name }}</td>
        <td>{{ item.user_phone }}</td>
        <td>{{ item.total_price }}</td>
        <td><v-btn color="primary">{{ item.status.name }}</v-btn></td>
        <td>{{ item.created_at }}</td>
        <td><v-btn @click.prevent="viewOrder(item.id)" color="success" elevation="0"><v-icon color="white">mdi-eye</v-icon></v-btn></td>
      </tr>
      </tbody>
    </v-table>
  </v-card-text>
</v-card>
  <v-dialog
      v-model="filter_dialog"
      scrollable
      max-width="600"
  >
    <v-card class="pa-4">
      <v-card-text>
        <div class="">
          <div style="font-size: 25px; font-weight: bold">Филтер</div>
          <div class="">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Имя:
            </label>
            <div>
              <input v-model="name" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Имя">
            </div>
          </div>
          <div class="mt-8">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Имя:
            </label>
            <div>
              <input v-model="name" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Имя">
            </div>
          </div>
        </div>
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            Лимит:
          </label>
          <div>
            <input v-model="name" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Имя">
          </div>
        </div>
        <div class="mt-4">
          <v-btn block color="success">Submit</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";
import {useRouter} from "nuxt/app";

export default {
  name: "index",
  data(){
    return{
      orders: [],
      filter_dialog: false,
      token: localStorage.getItem('token')
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get(BASE_URL+`/api/order`).then(response => {
      this.orders = response.data
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    viewOrder(id){
      const router = useRouter();
      router.push({ path: "/orders/"+id });
    }
  }
}
</script>

<style scoped>

</style>