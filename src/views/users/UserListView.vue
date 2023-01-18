<template>
  <div class="row">
   <div class="col-lg-8 offset-lg-2">
       <div class="table-responsive">
            <router-link to="/users/create" class="btn btn-info float-end m-2">
                <i class="fa-solid fa-database"></i> Registrar
            </router-link>
           <table class="table table-hover table-dark">
               <thead>
                   <tr>
                       <th>Id</th>
                       <th>Nombre</th>
                       <th>Apellido</th>
                       <th>Correo</th>
                       <th>Contraseña</th>
                       <th>Telefono</th>
                       <th>Acciones</th> 
                   </tr> 
               </thead>

               <tbody class="table-group-divider" id="contenido">
                   <tr v-for="user in users" :key="user.id_user">
                       <td>{{ user.id_user }}</td>
                       <td>{{ user.name }}</td>
                       <td>{{ user.lastname }}</td>
                       <td>{{ user.email }}</td>
                       <td>**********</td>
                       <td>{{ user.phone_number }}</td>
                     
                       <td>
                           <router-link :to="{path:'/users/edit/'+user.id_user}" class="btn btn-warning">
                               <i class="fa-solid fa-edit"></i>
                           </router-link> &nbsp;
                           <button class="btn btn-danger" v-on:click="deleteUser(user.id_user, user.name)">
                               <i class="fa-solid fa-trash"></i>
                           </button>
                       </td>
                   </tr>
               </tbody>
          
           </table>
       </div>
   </div>
  </div>



</template>

<script > 
import axios from 'axios';
import { confirmar } from '../../alerts';

export default{
   data(){
       return{users:null}
   },

   mounted(){
       this.getUsers();
   },

   methods:{
       getUsers(){
           axios.get('http://localhost:8000/api/users').then(
               response =>(
                   this.users = response.data.results
               )
           );         
       },
       deleteUser(id,nombre){
           confirmar(id,nombre)
       }
   }


}
</script>
