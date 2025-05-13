import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  constructor() { }

  alertaCumplimientoMeta(){
    return Swal.fire({
      title: '¡Felicidades!',
      text: 'Has cumplido tu meta de hoy',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  alertaSuccess(title: string, text: string){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  alertaError(title: string, text: string){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  
  alertaConConfirmacion(title:string, text: string){
    return Swal.fire({
      icon:"warning",
      title:title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText:"Cancelar",
    });
  }
  


}