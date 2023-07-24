import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { ReactiveFormsModule } from '@angular/forms';
//Importamos el modulo HttpClient
import { HttpClientModule } from '@angular/common/http';

//Se añade el componente TarjetaCredito
@NgModule({
  declarations: [
    AppComponent,
    TarjetaCreditoComponent
  ],
  imports: [
    BrowserModule,
    //Importamos formularios reactivos
    ReactiveFormsModule,
    //Importamos las animaciones
    BrowserAnimationsModule,
    //Importamos el modulo de Toastr
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
