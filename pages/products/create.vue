<template>
<v-card>
<v-card-text>
  <div style="margin-bottom: 42px; margin-top: 10px">
    <div style="font-size: 26px">Добавить Товар</div>
  </div>
  <v-divider style="margin-bottom: 12px; margin-top: 12px"></v-divider>
  <div>
    <form @submit.prevent="AddProduct">
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Имя:
          </label>
          <div>
            <input required v-model="name" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Имя">
          </div>
        </div>
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Описание:
          </label>
          <div>
            <textarea v-model="description" style="height: 220px" class="w-input border rounded w-full h-12 py-3 px-4" placeholder="Описание"></textarea>
          </div>
        </div>
      <div class="mt-8">
        <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
          <span style="color: #ff0000">*</span>Категории:
        </label>
       <div>
         <select required name="category" v-model="category_id" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
           <option selected>Выбирайте категорию</option>
           <option v-for="item in categories" :value="item.id">{{ item.name }}</option>
         </select>
       </div>
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Подкатегории:
          </label>
          <div>
            <select required v-model="subcategory_id" name="category" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option selected>Выбирайте подкатегорию</option>
              <option v-for="item in subcategories" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Бренды:
          </label>
          <div>
            <select required v-model="brand_id" name="brand" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option selected>Выбирайте бренд</option>
              <option v-for="item in brands" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
          <span style="color: #ff0000">*</span>Изображение:
        </label>
        <div>
          <input required @change="uploadImage" multiple ref="image" class="w-input border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Name">
        </div>
      </div>
      <div class="wrapper" style="">
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Цена:
          </label>
          <div>
            <input required v-model="price" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Цена">
          </div>
        </div>
        <div class="mt-8">
          <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
            <span style="color: #ff0000">*</span>Количества:
          </label>
          <div>
            <input required v-model="quantity" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="тгьиук" placeholder="Количества">
          </div>
        </div>
      </div>
     <div class="wrapper" style="">
       <div class="mt-8">
         <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
           <span style="color: #ff0000">*</span>Размер:
         </label>
         <div>
           <v-col
               cols="12"
               sm="6"
           >
             <v-select
                 v-model="attribute[0]['values']"
                 :items="sizes"
                 chips
                 multiple
                 solo
             ></v-select>
           </v-col>
<!--           <input v-model="attribute[0]['value']" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Размер">-->
         </div>
       </div>
       <div class="mt-8">
         <label style="font-size: 16px" class="block text-gray-700 mt-2" for="username">
           <span style="color: #ff0000">*</span>Цвет:
         </label>
          <div>
           <v-col
               cols="12"
               sm="6"
           >
             <v-select
                 v-model="attribute[1]['values']"
                 :items="colors"
                 chips
                 multiple
                 solo
             ></v-select>
           </v-col>
<!--           <input hidden v-model="attribute[1]['value']" class="w-input-min border rounded w-full h-12 py-3 px-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Цвет">-->
         </div>
       </div>
     </div>
      <v-btn type="submit" block color="success">Добавить</v-btn>
    </form>
  </div>
</v-card-text>
</v-card>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";

export default {
  name: "create",
  data() {
    return {
      categories: [],
      subcategories: [],
      brands: [],
      category_id: null,
      subcategory_id: null,
      name: null,
      description: null,
      images: [],
      quantity: 1,
      price: '1.00',
      brand_id: 1,
      attribute: [
        {
          values: [],
          attribute_id: 1
        },
        {
          values: [],
          attribute_id: 2
        },
      ],
      colors: [],
      sizes: [],
      selected_size: null,
      selected_color: null,
    }
  },
  watch: {
    category_id: function (){
      this.SubCategory();
    }
  },
  methods: {
    uploadImage(e) {
      for (let file of e.target.files) {
        try {
          let reader = new FileReader();
          reader.readAsDataURL(file); // Not sure if this will work in this context.
          this.images.push(file);
        } catch {}
      }
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
      formData.append('description', this.description ?? "test");
      formData.append('category_id', this.category_id);
      formData.append('subcategory_id', this.subcategory_id);
      formData.append('images', this.images);
      for(var i = 0; i < this.images.length; i++ ){
        let file = this.images[i];
        formData.append('images[' + i + ']', file);
      }
      formData.append('quantity', this.quantity);
      formData.append('price', this.price);
      formData.append('brand_id', this.brand_id);
      formData.append('attribute', JSON.stringify(this.attribute));
      formData.append('_method', 'POST');
      axios.post(BASE_URL+'/api/admin/product/create', formData)
          .then(response => {
            alert("Product created success!!!")
          })
          .catch(error => {
            console.log(error);
          });

    }
  },
  mounted() {
    axios.get(BASE_URL+'/api/category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    axios.get(BASE_URL+'/api/product/attributes')
        .then(response => {
          // const router = useRouter();
          this.colors = response.data.colors;
          this.sizes = response.data.sizes;
          // router.push({ path: "/" })
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