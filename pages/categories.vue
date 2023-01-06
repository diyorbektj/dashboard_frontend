

<template>

    <v-card>
        <v-card-text>
            <br />
            <h2 class="mb-7">General Table</h2>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Calories</th>
                        <th width="20" class="text-center">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                        <td align="center" justify="center">
                            <v-menu anchor="bottom end" origin="auto" min-width="300">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" class="pa-0 px-1" elevation="0" color="transparent" plain :ripple="false">
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                                    </v-btn>
                                </template>
                                <v-list rounded="lg" width="150">
                                    <v-btn block class="mt-2 " color="secondary" v-bind="attrs"  v-on="on"  @click="(dialog = true)"><v-icon dark>mdi-pencil</v-icon>Изменить</v-btn>
                                    <v-btn block class="mt-2 " color="error"><v-icon dark>mdi-delete</v-icon>Удалить</v-btn>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>

   
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="600"
    >
      <v-card width="600">
        <v-card-title>Изменения категория</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
     
                <v-text-field  label="Имя" :rules="rules" hide-details="auto"></v-text-field>
                <v-text-field class="mt-2"  label="Описания"></v-text-field>
      
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Отменить</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Сахранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  

</template>
<script>

export default {
    data: () => ({
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
     dialogm1: '',
     dialog: false,
      desserts: [
        {
        name: "Cupcake",
        calories: 305,
    },
    {
        name: "Gingerbread",
        calories: 356,
    },
    {
        name: "Cupcake",
        calories: 305,
    },
    {
        name: "Gingerbread",
        calories: 356,
    },
    {
        name: "Jelly bean",
        calories: 375,
    }
      ]
    }),
  };



</script>
