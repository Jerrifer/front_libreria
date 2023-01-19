import Swal from "sweetalert2";
import { enviarSolicitud } from './funciones';

export function show_alerta(message,icon,focus=''){
    if (focus !='') {
        document.getElementById(focus).focus();
    }
    Swal.fire({
        title:message,
        icon:icon,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    });
}

export function confirmar(id,name){
    var url = 'http://localhost:8000/api/users/'+id;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass:{confirmButton: 'btn btn-success me-3',cancelButton:'btn btn-danger'},
        buttonsStyling:false
    });
    swalWithBootstrapButtons.fire({
        title: 'Seguro de eliminar el usuario '+name,
        text: 'Se perderá la información del usurio',
        icon: 'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((ressult) => {
        if (ressult.isConfirmed) {
            enviarSolicitud('DELETE', {id:id}, url, 'Usuario eliminado');
        }else{
             show_alerta('operación cancelada', 'info');
        }
    })
}

export const swalWithBootstrapButtons = Swal.mixin({
        customClass:{confirmButton: 'btn btn-success me-3',cancelButton:'btn btn-danger'},
        buttonsStyling:false
    });
