<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3"> 
             <div class="card">
                 <div class="card-header bg-dark text-white text-center">Edit</div>
                 <div class="card-body">

                    <h1>Hola</h1>
                     <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                             <span class="input-group-text"> <strong>Nombre</strong> </span>
                             <input type="text" v-model="name" id="name" class="form-control" maxlength="50" placeholder="Nombre" required>
                         </div>
                         <div class="input-group mb-3">
                             <span class="input-group-text"> <strong>Apellido</strong> </span>
                             <input type="text" v-model="lastname" id="lastname" class="form-control" maxlength="50" placeholder="Apellido" required>
                         </div>
                         <div class="input-group mb-3">
                             <span class="input-group-text"> <strong>Correo</strong> </span>
                             <input type="text" v-model="email" id="usernames" class="form-control" maxlength="50" placeholder="Correo" required>
                         </div>
                         <div class="input-group mb-3">
                             <span class="input-group-text"> <strong>Contraseña</strong> </span>
                             <input type="text" v-model="password" id="user_last_names" class="form-control" maxlength="50" placeholder="Contraseña" required>
                         </div>
                         <div class="input-group mb-3">
                             <span class="input-group-text"> <strong>Número cel</strong> </span>
                             <input type="text" v-model="phone_number" id="phone_number" class="form-control" maxlength="50" placeholder="Número cel" required>
                         </div>
                         <div class="d-grid col-6 mx-auto">
                             <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Actualizar</button>
                         </div>
                     </form>
                 </div>
             </div>
        </div> 
    </div>
 </template>
 
 <script>

    import { enviarSolicitud } from '../../funciones';
    import { show_alerta } from '../../alerts';
    import { useRoute } from 'vue-router';
    import axios from 'axios';

     export default{
         data(){
             return{
                user: null,
                id_user: 0,
                name:'',
                lastname:'',
                email:'',
                password: '',
                phone_number: '',
                url: 'http://localhost:8000/api/users'
             }
         },
         mounted(){
            const route = useRoute();
            this.id_user = route.params.id;
            this.url = this.url+'/'+this.id_user;
            console.log(this.id_user),
            this.getUser();
         },
         methods:{
            getUser(){
                axios.get('http://localhost:8000/api/users/'+this.id_user).then(
                    res => (

                        console.log(res.data.results),
                        this.name = res.data.results['name'],
                        this.lastname = res.data.results['lastname'],
                        this.email = res.data.results['email'],
                        this.password = res.data.results['password'],
                        this.phone_number = res.data.results['phone_number']
                    )
                );
            },

             guardar(){
                 event.preventDefault();
                 if (this.name.trim() === '') {
                     show_alerta('escribe el nombre','warning','nombre');
                 }else if(this.lastname.trim() === '') {
                     show_alerta('escribe el apellido','warning','nombre');
                 }else if(this.email.trim() === '') {
                     show_alerta('escribe el correo','warning','nombre');
                 }else if(this.password.trim() === '') {
                     show_alerta('escribe la contraseña','warning','nombre');
                 }else if(this.phone_number.trim() === '') {
                     show_alerta('escribe el número telefonico','warning','nombre');
                 }else  {
                     var parametros = {  name:this.name.trim(),
                                         lastname:this.lastname.trim(),
                                         email:this.email.trim(),
                                         password:this.password.trim(),
                                         phone_number:this.phone_number.trim(),
                                     }
                                     console.log(parametros);
                     enviarSolicitud('PUT', parametros, this.url, 'Usuario actualizado');
                 }
             }
         }
     }
 
     
 </script>
 