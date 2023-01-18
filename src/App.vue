
<template>
  <nav class="navbar navbar-expand-lg bg-dark ">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light" aria-current="page">Libreria</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/login" class="nav-link link-light" href="#">LogIn</router-link>
          </li>
        </ul>
      </div>
      <button v-on:click="logout" class="font-bold rounded-md btn btn-outline-light">LogOut</button>
    </div>
  </nav>
  <div class="container-fluid mt-3">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
  export default{
    data() {
      return {}
    },

    methods: {
      logout() {
        axios.get('http://localhost:8000/api/logout').then(
          respuesta => {

            console.log(respuesta.data);
            var status = respuesta.data.status;

            if (status == 'success') {
                          show_alerta('Se cerro sesión', status);
                        window.setTimeout(function() {
                            window.location.href='/';
                        }, 1000);
                    }else{
                        var listado ='';
                        var msg = respuesta.data.message
                        var errores = respuesta.data.results;
                        Object.keys(errores).forEach(
                            key =>  listado += errores[key][0]+'.'
                        );
                        show_alerta(msg, listado);
                    }
          }).catch(function(error){
                show_alerta('Error en la solicitud', error);
        })

      }
    }
  }
</script>

<style>

</style>
