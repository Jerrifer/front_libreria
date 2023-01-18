<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <h1 class="float-center">Editoriales</h1>
                <router-link to="/editorials/create" class="btn btn-info float-end m-2">
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
                        <tr v-for="editorial in editorials" :key="editorial.id_editorial">
                            <td>{{ editorial.id_editorial }}</td>
                            <td>{{ editorial.name_editorial }}</td> 
                            
                            <td>
                                <router-link :to="{path:'editorials/edit/'+editorial.id_editorial}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link> &nbsp;
                                <button class="btn btn-danger" v-on:click="deleteEditorial(editorial.id_editorial, editorial.name_editorial)">
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
        return {editorials: null}
    },

    mounted(){

        this.getEditorials();

    },

    methods:{

        getEditorials() {
            axios.get('http://localhost:8000/api/editorials').then(
                respose => (
                    this.editorials = respose.data.results
                )
            )
        },

        deleteEditorial(id, name){
            var url = 'http://localhost:8000/api/editorials/'+id;

            const swalWithBootstrapButtons = Swal.mixin({
                customClass:{confirmButton: 'btn btn-success me-3',cancelButton:'btn btn-danger'},
                buttonsStyling:false
            });
            swalWithBootstrapButtons.fire({
                title: 'Seguro de eliminar el editorial '+name,
                text: 'Se perderá la información del editorial',
                icon: 'question',
                showCancelButton:true,
                confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
                cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
            }).then((ressult) => {

                //Confirma eliminación
                if (ressult.isConfirmed) {
                    axios({method:'DELETE', url:url, data:id}).then(function(respuesta){
                        
                        var status = respuesta.data['status'];

                        if (status == 'success') {
                            show_alerta('Eliminado exitosamente', status);
                            window.setTimeout(function() {
                                window.location.href='/editorials';
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
                }else{
                     show_alerta('operación cancelada', 'info');
                }
            });
        }
    }

}
</script>