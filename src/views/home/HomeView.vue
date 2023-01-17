<template>
    <div class="container">
        <div class="row">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="https://images.pexels.com/photos/4866043/pexels-photo-4866043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Usuarios</h5>
                    <router-link to="/users" class="btn btn-primary">Go</router-link>
                </div>
            </div>

            <div class="card mx-5" style="width: 18rem;">
                <img class="card-img-top" src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Autores</h5>
                    <router-link to="/authors" class="btn btn-primary">Go</router-link>
                </div>
            </div>

            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Editoriales</h5>
                    <router-link to="/editorials" class="btn btn-primary">Go</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {

        },
        mounted() {
            
        }
    }

</script>