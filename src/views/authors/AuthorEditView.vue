<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3"> 
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Registrar autor</div>
                <div class="card-body">
                    <form v-on:submit="updateAuthor">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-database"></i></span>
                            <input type="text" v-model="name" id="name" class="form-control" maxlength="50" placeholder="Nombre" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import { show_alerta } from '../../alerts';
    import { useRoute } from 'vue-router';
    import axios from 'axios';

export default{
   data(){
       return {name: ''}
   },
   mounted(){
        const route = useRoute();
        this.id_user = route.params.id;
        this.getAuthor();
   },
   methods:{


        getAuthor() {
            axios.get('http://localhost:8000/api/authors/'+this.id_user).then(
                res => (
                    this.name = res.data.results.name_author
                )
            )
        },

       updateAuthor() {
           event.preventDefault();
           var parametros = {
               name_author: this.name.trim()
           }

           console.log(parametros);

           var url = 'http://localhost:8000/api/authors/'+this.id_user;
           
           axios({method:'PUT', url:url, data:parametros}).then(function(respuesta){
                   console.log(respuesta.data);
                   var status = respuesta.data['status'];

                   if (status == 'success') {
                       show_alerta('Author actualizado correctamente', status);
                       window.setTimeout(function() {
                           window.location.href='/authors';
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