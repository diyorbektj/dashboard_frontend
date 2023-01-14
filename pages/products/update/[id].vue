<template>
  <v-card>
    <v-card-text>
      <div style="margin-bottom: 42px; margin-top: 10px">
        <div style="font-size: 26px">Добавить Товар</div>
      </div>
      <v-divider style="margin-bottom: 12px; margin-top: 12px"></v-divider>
      <div>
        <form>
          <div class="mt-8">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Имя:
            </label>
            <div>
              <input v-model="name" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Имя">
            </div>
          </div>
          <div class="mt-8">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Описание:
            </label>
            <div>
              <textarea style="height: 220px; color: #000000" class="w-input border rounded w-full h-12 py-3 px-4" placeholder="Описание" >
                {{ description }}
              </textarea>
            </div>
          </div>
          <div class="mt-8">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Категории:
            </label>
            <div>
              <select name="category" v-model="category_id" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option disabled value="">Выбирайте категорию</option>
                <option v-for="item in categories" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Подкатегории:
              </label>
              <div>
                <select v-model="subcategory_id" name="category" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option disabled value="">Выбирайте подкатегорию</option>
                  <option v-for="item in subcategories" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Бренды:
              </label>
              <div>
                <select v-model="brand_id" name="brand" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option disabled value="">Выбирайте бренд</option>
                  <option v-for="item in brands" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
              Изображение:
            </label>
            <div>
              <img :src="this.image" width="100">
              <input @change="uploadImage" ref="image" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Name">
            </div>
          </div>
          <div class="wrapper" style="">
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Цена:
              </label>
              <div>
                <input v-model="price" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Цена">
              </div>
            </div>
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Количества:
              </label>
              <div>
                <input v-model="quantity" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="тгьиук" placeholder="Количества">
              </div>
            </div>
          </div>
          <div class="wrapper" style="">
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Размер:
              </label>
              <div>
                <input v-model="attribute[0]['value']" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Цена">
              </div>
            </div>
            <div class="mt-8">
              <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
                Цвет:
              </label>
              <div>
                <input v-model="attribute[1]['value']" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Количества">
              </div>
            </div>
          </div>
          <v-btn @click.prevent="AddProduct" block color="success">Добавить</v-btn>
        </form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../../constants";

export default {
  name: "create",
  data() {
    return {
      product: {},
      categories: [],
      subcategories: [],
      brands: [],
      category_id: null,
      subcategory_id: null,
      name: null,
      description: null,
      images: [],
      image: "",
      quantity: 1,
      price: '0.00',
      brand_id: null,
      attribute: [
        {
          value: '',
          attribute_id: 1
        },
        {
          value: '',
          attribute_id: 2
        },
        {
          value: '',
          attribute_id: 3
        },
      ],
    }
  },
  watch: {
    category_id: function (){
      this.SubCategory();
    }
  },
  methods: {
    uploadImage(e) {
      this.images[0] = e.target.files[0];
      console.log(this.images)
    },
    SubCategory(){
      axios.get(BASE_URL+'/api/subcategory/category/'+this.category_id)
          .then(res => this.subcategories = res.data.data)
          .catch(error => {
            console.log(error)
          });
    },
    AddProduct() {

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('category_id', this.category_id);
      formData.append('subcategory_id', this.subcategory_id);
      formData.append('images[]', this.images);
      formData.append('quantity', this.quantity);
      formData.append('price', this.price);
      formData.append('brand_id', this.brand_id);
      formData.append('attribute', JSON.stringify(this.attribute));
      formData.append('_method', 'PATCH');
      console.log(formData);
      const route = useRoute()
      axios.post(BASE_URL+'/api/product/update/'+route.params.id, formData)
          .then(response => {
            console.log(response.data);
            alert("Product created success!!!")
          })
          .catch(error => {
            console.log(error);
          });

    }
  },
  mounted() {
    const route = useRoute()
    axios.get(BASE_URL+'/api/product/'+route.params.id)
        .then(response => {
          this.product = response.data.data
          this.name = this.product.name
          this.description = this.product.description
          this.category_id = this.product.category.id
          this.subcategory_id = this.product.subcategory_id
          this.brand_id = this.product.brand_id
          this.price = this.product.price
          this.quantity = this.product.quantity
          this.attribute[0]['value'] = this.product.attributes[0]['value']
          this.attribute[1]['value'] = this.product.attributes[1]['value']
         if(this.images.length === 0)  this.images[0]['name']= BASE_URL + this.product.image
         if(this.images.length > 0)  this.images[this.images.length + 1]['name']= BASE_URL + this.product.image;
        })
        .catch(error => {
          console.log(error);
        });
    axios.get(BASE_URL+'/api/category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    axios.get(BASE_URL+'/api/brands')
        .then(response => {
          this.brands = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  },
}
</script>

<style scoped>
@media screen and (min-width: 640px) {
  .w-input{
    width: 450px;
  }
  .w-input-min{
    width: 115px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 764px) {
  .w-input{
    width: 650px;
  }
  .w-input-min{
    width: 225px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1024px) {
  .w-input{
    width: 850px;
  }
  .w-input-min{
    width: 325px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }
}
@media screen and (min-width: 1280px) {
  .w-input{
    width: 1050px;
  }
  .w-input-min{
    width: 425px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }
}
</style>