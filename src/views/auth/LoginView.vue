<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
       <div class="table-responsive">
            <form v-on:submit="login">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
       </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { show_alerta } from '@/alerts';

export default {

    data() {
        return{
                 email: '',
                 password:'',
             }
    },
    methods:{

        login() {

            event.preventDefault();

            var parametros = {
                email: this.email.trim(),
                password: this.password.trim()
            }

            axios({method:'POST', url:'http://localhost:8000/api/login', data:parametros}).then(function(respuesta){
                    console.log(respuesta.data);
                    var status = respuesta.data.status;

                    if (status == 'success') {
                        // localStorage.setItem('usuario', JSON.stringify(respuesta.data.results.user));
                        // localStorage.setItem('access_token', JSON.stringify(respuesta.data.results.access_token));

                        console.log(status);

                        //axios.defaults.headers.common['Authorization'] = 'Bearer' + respuesta.data.results.access_token;

                        show_alerta('Usuario existe', status);
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