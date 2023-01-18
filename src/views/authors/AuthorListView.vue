<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <h1 class="float-center">Autores</h1>
                <router-link to="/authors/create" class="btn btn-info float-end m-2">
                    <i class="fa-solid fa-database"></i> Registrar
                </router-link>
                <table
                 class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr> 
                    </thead>

                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="author in authors" :key="author.id_author">
                            <td>{{ author.id_author }}</td>
                            <td>{{ author.name_author }}</td> 
                            
                            <td>
                                <router-link :to="{path:'authors/edit/'+author.id_author}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link> &nbsp;
                                <button class="btn btn-danger" v-on:click="deleteAuthor(author.id_author, author.name_author)">
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

<script>

import axios from 'axios';
import Swal from "sweetalert2";
import { show_alerta } from '@/alerts';

export default{
    data(){
        return {authors: null,
            urlAuthors: 'http://localhost:8000/api/authors'
        };
    },

    mounted(){
        this.getAuthors();
    },

    methods:{
        getAuthors(){
            axios.get(this.urlAuthors).then(
                response=> {
                    this.authors = response.data.results;
                }
            )
        },

        deleteAuthor(id, name) {
            var url = this.urlAuthors+'/'+id;

            //SweetAlert
            const swalWithBootstrapButtons = Swal.mixin({
                customClass:{confirmButton: 'btn btn-success me-3',cancelButton:'btn btn-danger'},
                buttonsStyling:false
            });
            swalWithBootstrapButtons.fire({
                title: 'Seguro de eliminar el autor '+name,
                text: 'Se perderá la información del author',
                icon: 'question',
                showCancelButton:true,
                confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
                cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
            }).then((ressult) => {

                //Confirma eliminación
                if (ressult.isConfirmed) {
                    axios({method:'DELETE', url:url, data:id}).then(function(respuesta){
                        console.log(respuesta.data);
                        var status = respuesta.data['status'];

                        if (status == 'success') {

                            show_alerta('Eliminado exitosamente', 'success');
                            
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
                        show_alerta('Error en la solicitud', 'error');
                        })
                }else{
                     show_alerta('operación cancelada', 'success');
                }})
        },

       
    }

}
</script>