<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <h1>{{ material.document }}</h1>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
// import Swal from "sweetalert2";
// import { show_alerta } from '@/alerts';
import { useRoute } from 'vue-router';


export default{
    data(){
        return {material: null,

            urlMaterial: 'http://localhost:8000/api/materials'
        };
    },

    mounted(){
        const route = useRoute();
        this.getMaterials();
        this.id_material = route.params.id;
    },

    methods:{

        getMaterials(){
            axios.get(this.urlMaterial+'/'+this.id_material).then(
                response=> {
                    this.material = response.data.results;
                    console.log(response.data.results);

                }
            )
        },

        

       
    }

}
</script>