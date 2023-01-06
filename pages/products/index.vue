<template>
  <v-card>
    <v-card-text>
      <br />
      <div class="d-flex" style="justify-content: space-between">
        <div class="mb-7" style="font-size: 24px">Товары</div>
        <v-btn @click="AddProduct" elevation="0" color="success">Добавить</v-btn>
      </div>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Имя</th>
          <th class="text-left">Изображение</th>
          <th class="text-left">Количество</th>
          <th class="text-left">Категория</th>
          <th class="text-left">Цена за шт.</th>
          <th class="text-left">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td><img width="70" :src="base_url+''+item.image" :alt="item.name"></td>
          <td>{{ item.quantity }} шт.</td>
          <td>
            <p>{{ item.category.name }}</p>
            <p>Test</p>
          </td>
          <td>{{ item.price }} c.</td>
          <td>
            <v-menu anchor="bottom end" origin="auto" min-width="300">
              <template v-slot:activator="{ props }">
                <v-btn plain :ripple="false" v-bind="props" elevation="0"><v-icon>mdi-dots-vertical</v-icon></v-btn>
              </template>
              <v-list rounded="lg" width="100">
                <v-btn block class="mt-2" style="width: 100px" elevation="0" v-on="on"  @click="UpdateCategory(item.id)">
                  Изменить
                </v-btn>
                <v-btn block class="mt-2 " style="width: 100px" elevation="0">Удалить</v-btn>
              </v-list>
            </v-menu>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";
import {useHead, useRouter} from "nuxt/app";
import {ref} from "vue";

const title = ref('Товары')
const description = ref('Товары')

useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

export default {
  name: "index",
  data() {
    return {
      products: [],
      dialog: false,
      title: "",
      countDown: 0,
      value: 90,
      category: {},
      dialog2: false,
      base_url: BASE_URL
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/product`).then(response => {
      this.products = response.data.data
    }).catch(err => {
      console.log(err);
    });

  },
  methods: {
    EditCategory(id){
      axios.get(BASE_URL+`/api/category/`+id).then(response => {
        this.category = response.data
        this.dialog = true
      }).catch(err => {
        console.log(err);
      });
    },
    DeleteCategory(id){
      axios.delete(BASE_URL+`/api/category/`+id).then(response => {
        this.categories = this.categories.filter(item => {
          return item.id !== id
        });
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
    },
    AddProduct(){
      const router = useRouter();
      router.push({ path: "/products/create" });
    },
    UpdateCategory(id){
      const router = useRouter();
      router.push({ path: "/products/update/"+id });
    },
    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 20
          this.countDownTimer()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>

</style>