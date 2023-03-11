<template>
  <v-card>
    <v-card-text>
      <br />
      <div style="display:flex; justify-content: space-between">
        <div style="font-size: 24px" class="mb-8">Заказы</div>
      </div>
      <v-alert v-if="orders.address"
          v-model="alert"
          variant="tonal"
          color=""
          title="Адресс товар"
      >
        <p class="py-1">Имя: {{ orders.address.fullname }} <br /></p>
        <p class="py-1">Город: {{ orders.address.city }} <br /></p>
        <p class="py-1">Улица: {{ orders.address.street }} <br /></p>
        <p class="py-1">Тел: {{ orders.address.phone_number }} <br /></p>
      </v-alert>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Имя продукт</th>
          <th class="text-left">Доп.</th>
          <th class="text-left">Количество</th>
          <th class="text-left">Цена</th>
          <th class="text-left">Создан</th>
<!--          <th class="text-left">View</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orders.data" :key="index">
          <td>{{ index +1 }}</td>
          <td>{{ item.product.name }}</td>
          <td>
            <p>{{ item.product.colors[0].attribute }}: {{ item.product.colors[0].value }}</p>
            <p>{{ item.product.sizes[0].attribute }}: {{ item.product.sizes[0].value }}</p>
          </td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }} c.</td>
          <td>{{ item.created_at }}</td>
<!--          <td><v-btn @click.prevent="viewOrder(item.id)" color="success" elevation="0"><v-icon color="white">mdi-eye</v-icon></v-btn></td>-->
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
    axios.get(BASE_URL + `/api/order/` + route.params.id).then(response => {
      this.orders = response.data
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