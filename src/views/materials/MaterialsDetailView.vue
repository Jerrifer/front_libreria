<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <h1>{{ name }}</h1>

                <figure>
                    <embed :src="document" type="application/pdf" width="300" height="300" />
                </figure>

                <br>

                <button class="btn btn-secondary" v-on:click="preDowloand()">
                    <i class="fa-solid fa-file-arrow-down"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
// import Swal from "sweetalert2";
import { show_alerta, swalWithBootstrapButtons } from '@/alerts';
import { useRoute } from 'vue-router';


export default{

    data(){
        return {document: null,
            name: null,

            urlMaterial: 'http://localhost:8000/api/materials/'
        };
    },

    mounted(){
        const route = useRoute();
        this.id_material = route.params.id;
        this.getMaterial();
        console.log(this.urlMaterial+this.id_material);
    },

    methods:{

        getMaterial() {
            axios.get(this.urlMaterial+this.id_material).then(
                respuesta => (
                    this.name = respuesta.data.results[0].name_material,
                    this.document = 'http://127.0.0.1:8000/storage/document_folder/'+respuesta.data.results[0].document,
                    // this.selectedEditorial = respuesta.data.results[0].id_editorial,
                    // this.selectedType = respuesta.data.results[0].id_type_material,


                    console.log(respuesta.data.results[0])
                )
            )
        },

        preDowloand() {
            swalWithBootstrapButtons.fire({
                title: '¿Seguro que desea descargar el material '+this.name+'?',
                text: '',
                icon: 'question',
                showCancelButton:true,
                confirmButtonText:'<i class="fa-solid fa-check"></i> Si, descargar',
                cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
            }).then((ressult) => {
                if (ressult.isConfirmed) {
                    axios(this.urlMaterial+'download/'+this.id_material)
                .then( async resp => {
                    console.log(resp);
                    this.downloadFile(resp);
                })
                .catch( erro => console.log(erro));
                }else{
                    show_alerta('operación cancelada', 'warning');
                }
            });

            //show_alerta('¿Seguro que desea descargar el material', 'info');



            
        },

        downloadFile(response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${this.name}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            
        }
        

       
    }

}
</script>