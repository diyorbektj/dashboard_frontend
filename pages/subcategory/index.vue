<template>
  <v-card>
    <v-card-text>
      <br />
      <div class="d-flex" style="justify-content: space-between">
        <div class="mb-7" style="font-size: 24px">Подкатегории</div>
        <v-btn @click="dialog2=true" elevation="0" color="success">Добавить</v-btn>
      </div>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Имя</th>
          <th class="text-left">Категория</th>
          <th class="text-left">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in subcategories" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>
            <v-btn class="mx-2" color="secondary" elevation="0.0" v-bind="attrs"  v-on="on"  @click="EditSubCategory(item.id)"><v-icon dark>mdi-pencil</v-icon></v-btn>
            <v-btn @click="DeleteSubCategory(item.id)" class="mx-2" color="error"><v-icon dark>mdi-delete</v-icon></v-btn>
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
    <v-card width="600">
      <v-card-title>Добавить подкатегория</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 200px;">
        <div class="flex" style="display: flex;justify-content: center;">
          <input placeholder="Имя" type="text" v-model="title" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
        </div>
        <div class="flex mt-8" style="display: flex;justify-content: center;">
          <select v-model="category_id" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
            <option v-for="item in categories" :value="item.id">{{ item.name }}</option>
          </select>
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
      <v-card-title>Изменить подкатегория</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 200px;">
        <div class="flex" style="display: flex;justify-content: center;">
          <input placeholder="Имя" type="text" v-model="subcategory.name" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
        </div>
        <div class="flex mt-8" style="display: flex;justify-content: center;">
          <select v-model="category_id" class="px-4 py-4 rounded" style="border: 2px solid #e0e0e0; width: 420px">
            <option v-for="item in categories" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn elevation="0" class="mr-2" text @click="dialog = false">Отменить</v-btn>
        <v-btn elevation="0" color="success" @click.prevent="UpdateSubCategory(subcategory.id)">Сохранить</v-btn>
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

const title = ref('ПодКатегории')
const description = ref('ПодКатегории лист')

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
      subcategories: [],
      categories: [],
      category_id: 1,
      dialog: false,
      title: "",
      countDown: 0,
      value: 90,
      subcategory: {},
      dialog2: false
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/subcategory`).then(response => {
      this.subcategories = response.data.data
    }).catch(err => {
      console.log(err);
    });
    axios.get(BASE_URL+`/api/category`).then(response => {
      this.categories = response.data
    }).catch(err => {
      console.log(err);
    });

  },
  methods: {
    EditSubCategory(id){
      this.dialog = true
      axios.get(BASE_URL+`/api/subcategory/`+id).then(response => {
        this.subcategory = response.data.data
        console.log(this.subcategory)
      }).catch(err => {
        console.log(err);
      });
    },
    DeleteSubCategory(id){
      axios.delete(BASE_URL+`/api/subcategory/`+id).then(response => {
        this.subcategories = this.subcategories.filter(item => {
          return item.id !== id
        });
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
    },
    AddCategory(){
      axios.post(BASE_URL+`/api/subcategory/create`,{
        name: this.title,
        category_id: this.category_id
      }).then(response => {
        console.log("test")
        this.subcategories.push(response.data.data)
        this.countDown = 100
        this.countDownTimer()
      }).catch(err => {
        console.log(err);
      });
    },
    UpdateSubCategory(id){
      axios.patch(BASE_URL+`/api/subcategory/update/`+id,{
        name: this.subcategory.name,
        category_id: this.category_id
      }).then(response => {
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