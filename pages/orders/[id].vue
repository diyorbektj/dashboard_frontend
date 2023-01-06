<template>
  <v-card>
    <v-card-text>
      <br />
      <div style="display:flex; justify-content: space-between">
        <div style="font-size: 24px" class="mb-8">Заказы</div>
        <v-btn color="success"><v-icon>mdi-filter</v-icon></v-btn>
      </div>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Product name</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Price</th>
          <th class="text-left">Created_at</th>
          <th class="text-left">View</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orders" :key="index">
          <td>{{ index +1 }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.created_at }}</td>
          <td><v-btn @click.prevent="viewOrder(item.id)" color="success" elevation="0"><v-icon color="white">mdi-eye</v-icon></v-btn></td>
        </tr>
        </tbody>
      </v-table>
      <v-card-text style="display: flex; justify-content: space-around">
        <v-btn color="error">Cannceled</v-btn>
        <v-btn color="primary">Pending</v-btn>
        <v-btn color="success">Success</v-btn>
      </v-card-text>
    </v-card-text>
  </v-card>
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
      token: localStorage.getItem('token')
    }
  },
  mounted() {
    const route = useRoute()
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get(BASE_URL+`/api/order/`+route.params.id).then(response => {
      this.orders = response.data.data
      console.log(this.orders)
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