<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3"> 
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Registrar nivel educativo</div>
                <div class="card-body">
                    <form v-on:submit="createEdlevel">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><strong>Nombre</strong></span>
                            <input type="text" v-model="level" id="level" class="form-control" maxlength="50" placeholder="Nombre" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import { show_alerta } from '@/alerts';
import axios from 'axios';

export default{
   data(){
       return {edlevels: null}
   },
   methods:{
       createEdlevel() {
           event.preventDefault();
           var parametros = {
               level: this.level.trim()
           }

           console.log(parametros);

           var url = 'http://localhost:8000/api/educationlevels';
           
           axios({method:'POST', url:url, data:parametros}).then(function(respuesta){
                   console.log(respuesta.data);
                   var status = respuesta.data['status'];

                   if (status == 'success') {
                       show_alerta('Nivel educativo guardado correctamente', status);
                       window.setTimeout(function() {
                           window.location.href='/edlevels';
                       }, 1000);
                   }else{
                       var listado ='';
                       var errores = respuesta.data['errores'];
                       Object.keys(errores).forEach(
                           key =>  listado += errores[key][0]+'.'
                       );
                       show_alerta(listado, 'error');
                   }
           }).catch(function(error){
               show_alerta('Error en la solicitud', error);
           })
               
       }
   }
}

</script>