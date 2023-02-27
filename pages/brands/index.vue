<template>
  <v-card>
    <v-card-text>
      <br />
      <div class="d-flex" style="justify-content: space-between">
        <div class="mb-7" style="font-size: 24px">Бренды</div>
        <v-btn @click="dialog2=true" elevation="0" color="success">Добавить</v-btn>
      </div>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Имя</th>
          <th class="text-left">Изображение</th>
          <th class="text-left">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in categories" :key="item.name">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td><img :src="item.image" :alt="item.name"></td>
          <td>
            <v-btn class="mx-2" color="secondary" elevation="0.0" v-bind="attrs"  v-on="on"  @click="EditCategory(item.id)"><v-icon dark>mdi-pencil</v-icon></v-btn>
            <v-btn @click="DeleteCategory(item.id)" class="mx-2" color="error"><v-icon dark>mdi-delete</v-icon></v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
  <v-dialog
      v-model="dialog2"
      scrollable
      max-width="600"
  >
    <v-card width="600" height="300">
      <v-card-title>Добавить бренд</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 220px;">
        <div class="flex" style="">
          <div>Имя</div>
          <input placeholder="Имя" type="text" v-model="title" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
        </div><div class="flex" style="padding-top: 10px">
        <div>Изображение</div>
        <input type="file" ref="file" @change="handleFileChange" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn elevation="0" class="mr-2" text @click="dialog2 = false">Отменить</v-btn>
        <v-btn elevation="0" color="success" @click.prevent="AddCategory">Сохранить</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="600"
  >
    <v-card width="600">
      <v-card-title>Изменить бренд</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 200px;">
        <div class="flex" style="display: flex;justify-content: center;">
          <input placeholder="Имя" type="text" v-model="category.name" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn elevation="0" class="mr-2" text @click="dialog = false">Отменить</v-btn>
        <v-btn elevation="0" color="success" @click.prevent="UpdateCategory(category.id)">Сохранить</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
  <div v-if="countDown > 0" style="max-width: 420px; z-index: 100">
    <v-progress-linear
        style="position: absolute; top: 85px; right: 25px; width: 420px;"
        v-model="countDown"
        color="green"
    ></v-progress-linear>
    <v-alert
        style="position: absolute; top:90px; right: 24px; width: 420px;"
        dismissible
        outlined
        prominent
        shaped
        text="Success"
        type="success"
    ></v-alert>
    <button style="position: absolute; top: 90px; right: 25px; font-size: 18px; color: #fff">
      X
    </button>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";
import {useHead} from "nuxt/app";
import {ref} from "vue";

const title = ref('Категории')
const description = ref('Категтрии лист')

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
      categories: [],
      dialog: false,
      title: "",
      countDown: 0,
      value: 90,
      category: {},
      dialog2: false,
      token: localStorage.getItem('token')
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get(BASE_URL+`/api/admin/brands`).then(response => {
      this.categories = response.data
    }).catch(err => {
      console.log(err);
    });

  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    EditCategory(id){
      axios.get(BASE_URL+`/api/admin/brands/`+id).then(response => {
        this.category = response.data
        this.dialog = true
      }).catch(err => {
        console.log(err);
      });
    },
    DeleteCategory(id){
      axios.delete(BASE_URL+`/api/admin/brands/`+id).then(response => {
        this.categories = this.categories.filter(item => {
          return item.id !== id
        });
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
    },
    AddCategory(){
      const formData = new FormData();
      formData.append('image', this.file);
      axios.post(BASE_URL+`/api/admin/brands/create`,formData, {params: {name: this.title,}}).then(response => {
        console.log("test")
        this.categories.push(response.data)
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
    },
    UpdateCategory(id){
      axios.put(BASE_URL+`/api/admin/brands/update/`+id,{
        name: this.category.name,
      }).then(response => {
      this.categories.find(item => item.id === id).title = this.category.name
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
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