<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <h1 class="float-center">Niveles educativos</h1>
                <router-link to="/edlevels/create" class="btn btn-info float-end m-2">
                    <i class="fa-solid fa-database"></i> Registrar
                </router-link>
                <table
                 class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nivel Educativo</th>
                            <th>Acciones</th>
                        </tr> 
                    </thead>

                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="edLevel in edLevels" :key="edLevel.id_education_level">
                            <td>{{ edLevel.id_education_level }}</td>
                            <td>{{ edLevel.level }}</td> 
                            
                            <td>
                                <router-link :to="{path:'edlevels/edit/'+edLevel.id_education_level}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link> &nbsp;
                                <button class="btn btn-danger" v-on:click="deleteEdLevel(edLevel.id_education_level, edLevel.level)">
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

export default {

    data() {
        return { edLevels: null,
            urlEdLevel: 'http://localhost:8000/api/educationlevels'}
    },
    mounted() {
        this.getEdLevels();
    },
    methods: {
        getEdLevels() {
            axios.get(this.urlEdLevel).then(
                response => {{
                    this.edLevels = response.data.results;
                }}
            )
        },

        deleteEdLevel(id, name) {
            var url = this.urlEdLevel+'/'+id;

            //SweetAlert
            const swalWithBootstrapButtons = Swal.mixin({
                customClass:{confirmButton: 'btn btn-success me-3',cancelButton:'btn btn-danger'},
                buttonsStyling:false
            });
            swalWithBootstrapButtons.fire({
                title: 'Seguro de eliminar el nivel educativo'+name,
                text: 'Se perderá la información del nivel educativo',
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
                        console.log(error);

                        show_alerta('Error en la solicitud', 'error');
                        })
                }else{
                     show_alerta('operación cancelada', 'success');
                }})
        }
    }
}
</script>
