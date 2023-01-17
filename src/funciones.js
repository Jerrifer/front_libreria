import axios from "axios";
import { show_alerta } from './alerts';


export function enviarSolicitud(metodo,parametros,url,mensaje){ 
    axios({method:metodo, url:url, data:parametros}).then(function(respuesta){
       console.log(respuesta.data);
        var status = respuesta.data['status'];
        if (status == 'success') {
            show_alerta(mensaje, status);
            window.setTimeout(function() {
                window.location.href='/users';
            }, 1000);
        }else{
            var listado ='';
            var errores = respuesta.data['message'];
            Object.keys(errores).forEach(
                key =>  listado += errores[key][0]
            );
            show_alerta(listado, 'error');
        }
    }).catch(function(error){
        show_alerta('Error en la solicitud', error);
    })
}