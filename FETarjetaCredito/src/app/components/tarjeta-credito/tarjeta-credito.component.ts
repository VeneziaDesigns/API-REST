import { Component, OnInit } from '@angular/core';
//Importamos FormGroup, FormBuilder y Validators
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos ToastrService
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  //Nombre que tenemos que poner en app-ComponentFactoryResolver.html para que lo renderice
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {
  //Creamos array de objetos para iterarlo
  listTarjetas: any[] = [];

  accion = 'Agregar';


  id: number | undefined;

  //Creamos una nuevaa varialble de tipo FormGroup
  form: FormGroup;
//Inyectamos las dependencias en el contructor
  constructor(private fb:FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
  //Agregamos las validaciones
      titular: ['', Validators.required],
  //Si es mas de 1 validacion debe ir entre corchetes
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
  })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data =>{
      console.log(data);
      this.listTarjetas = data;
    }, error => {
      console.log(error);
    })
  }

  guardarTarjeta() {

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if (this.id == undefined) {
      //Agregamos tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('La tarjeta fue registrada con exito', 'Tarjeta agregada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('Opss... ocurrio un error', 'Error');
        console.log(error);
      })
    } else {
      tarjeta.id = this.id;
      //Editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }
}

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tajeta fue eliminada con exito', 'Tarjeta eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    })
  }

  //Si el id tiene un valor espamos en modo editar,
  //Si es undefined estamos en el modo agregar
  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
  }
}
