<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Registrar material</div>
                <div class="card-body">
                    <form v-on:submit="createMaterial" enctype="multipart/form-data">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><strong>Nombre</strong></span>
                            <input type="text" v-model="name" id="name" class="form-control" maxlength="50" placeholder="Nombre" required>
                        </div>
                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Tipo material</strong></span>
                           <select v-model="selectedType" id="typematerials" class="form-control" maxlength="50" >
                               <option v-for="typematerial in typematerials" :key="typematerial.id_type_material" v-bind:value="typematerial.id_type_material"> {{ typematerial.name_type }} </option>
                           </select>
                        </div>


                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Editorial</strong></span>
                           <select v-model="selectedEditorial" id="editorials" class="form-control" maxlength="50" >
                               <option v-for="editorial in editorials" :key="editorial.id_editorial" v-bind:value="editorial.id_editorial"> {{ editorial.name_editorial }} </option>
                           </select>
                        </div>


                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Nivel educativo</strong></span>
                           <select v-model="selectedEdLevel" id="educationlevels" class="form-control" maxlength="50" >
                               <option v-for="edlevel in edlevels" :key="edlevel.id_education_level" v-bind:value="edlevel.id_education_level" > {{ edlevel.level }} </option>
                           </select>
                        </div>


                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Autor</strong></span>
                           <select v-model="selectedAuthor" id="educationlevels" class="form-control" maxlength="50" >
                               <option v-for="author in authors" :key="author.id_author" v-bind:value="author.id_author" > {{ author.name_author }} </option>
                           </select>
                        </div>

                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Autor</strong></span>
                           <select v-model="selectedAuthor" id="educationlevels" class="form-control" maxlength="50" >
                                <option v-for="author in authors" :key="author.id_author" v-bind:value="author.id_author" > 
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {{ author.name_author }}
                                        </label>
                                    </div>
                                </option>
                           </select>
                        </div>
                        

                        <div class="input-group mb-3">
                           <span class="input-group-text"><strong>Documento</strong></span>
                           <input @change="getDocument" id="document" class="form-control" type="file" accept="application/pdf">
                        </div>


                        <div class="input-group mb-3">
                           <figure>
                                <embed :src="doc()" type="application/pdf" width="100%" height="300px" />
                           </figure>
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
       return {
           name: null,


           docMin: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=1600',
           document:null,


           typematerials: null,
           editorials: null,
           edlevels: null,
           authors:null,


           urlBase: 'http://localhost:8000/api/',


           selectedType: '',
           selectedEditorial: '',
           selectedEdLevel: '',
           selectedAuthor: '',


       }
   },
   mounted() {
       this.getSelects(),
       this.doc()
      
       // this.getTypeMaterials(),
       // this.getEditorials(),
       // this.getEdLevels(),
       // this.getAuthors()
   },
   methods:{


        doc() {  
            return this.docMin;
        },


        getSelects() {
            axios.get(this.urlBase+'authors').then(
                response => {
                    this.authors = response.data.results
                }
            )


            axios.get(this.urlBase+'educationlevels').then(
                response => {
                    this.edlevels = response.data.results
                }
            )


            axios.get(this.urlBase+'editorials').then(
                response => {
                    this.editorials = response.data.results
                }
            )


            axios.get(this.urlBase+'typematerials').then(
                response => {
                    this.typematerials = response.data.results
                }
            )
        },


        
        getDocument(event) {
            let file = event.target.files[0];
            console.log(file);
            this.document = file;
            this.showDocument(file);
        },


        showDocument(file) {
            let reader = new FileReader();

            reader.onload = (event) => {
                this.docMin = event.target.result;
            }

            reader.readAsDataURL(file);
        },


        createMaterial() {
            event.preventDefault();
                
                var parametros = {
                    name_material: this.name.trim(),
                    name_material: this.name.trim(),
                    type_material_id: this.selectedType,
                    editorial_id: this.selectedEditorial,
                    author_id: this.selectedAuthor,
                    education_level_id: this.selectedEdLevel,
                    document: this.document
                    }


                console.log(parametros);




            var url = 'http://localhost:8000/api/materials';
            
            axios({method:'POST', url:url, data:parametros, headers : {'content-type': 'multipart/form-data'} }).then(function(respuesta){
                    console.log(respuesta.data);
                    var status = respuesta.data['status'];


                    if (status == 'success') {
                        show_alerta('Material guardado correctamente', status);
                        window.setTimeout(function() {
                            window.location.href='/materials';
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
                
        }


       // getAuthors(){
       //     axios.get(this.urlBase+'authors').then(
       //         response => {
       //             this.authors = response.data.results
       //         }
       //     )
       // },
      
       // getEdLevels(){
       //     axios.get(this.urlBase+'educationlevels').then(
       //         response => {
       //             this.edlevels = response.data.results
       //         }
       //     )
       // },


       // getEditorials(){
       //     axios.get(this.urlBase+'editorials').then(
       //         response => {
       //             this.editorials = response.data.results
       //         }
       //     )
       // },


       // getTypeMaterials(){
       //     axios.get(this.urlBase+'typematerials').then(
       //         response => {
       //             this.typematerials = response.data.results
       //         }
       //     )
       // },
   }
}


</script>
