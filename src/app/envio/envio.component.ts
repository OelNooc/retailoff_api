import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { Envio } from '../models/envio.model';
import { AlertController } from '@ionic/angular';

import { JsonPipe } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss'],
  standalone: false
})
export class EnvioComponent  implements OnInit {

  model: Envio = { ID_ENVIO: this.generate(), ID_PRODUCTO: this.generate(), NOMBRE_PRODUCTO: '', NOMBRE_CLIENTE: '', DIRECCION: '', CANTIDAD: 0 }
  public envio: any;

  constructor(private _peticionesService: PeticionesService,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this._peticionesService.getEnvio().subscribe(
      result => {
        console.log(result);
        this.envio = result;
        return result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  agregarEnvio() {
    console.log(this.model);

    this._peticionesService.addEnvio(this.model).subscribe(
      (response: Envio) => {
        console.log(response)
        if (this.model.NOMBRE_CLIENTE == "") {
          this.showAlert("Error", "no pueden quedar campos vacios")
        } else {
          this.showAlert("Envio Agregado", this.model.DIRECCION)
        }
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    });
    await alert.present();
    setTimeout(location.reload.bind(location), 1000);
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max-min + 1)) + min;
  }

  generate(): number {
    return this.getRandomInt(0, 99999);
  }

}
