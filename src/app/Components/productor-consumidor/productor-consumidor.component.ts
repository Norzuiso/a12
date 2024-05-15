import {Component, HostListener} from '@angular/core';
import {element} from "../Element";


@Component({
  selector: 'app-productor-consumidor',
  templateUrl: './productor-consumidor.component.html',
  styleUrl: './productor-consumidor.component.css'
})
export class ProductorConsumidorComponent {
  contenedor: element[] = new Array(22).fill(element); // Contenedor con capacidad para 22 elementos
  productorTrabajando: boolean = false;
  consumidorTrabajando: boolean = false;
  continueProcess = true;
  productorIndex = 0;
  consumidorIndex = 0;
  tiempo = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.continueProcess = false;
    }
  }

  consumidorOProductor = 0

  async iniciarProceso() {
    while (this.continueProcess) {
      await this.waitTime(2);
      // Producir de 3 a 6 elementos
      this.consumidorOProductor = this.caraOCruz();
      if (this.consumidorOProductor) {
        await this.iniciarProductor()
      } else {
        await this.iniciarConsumidor()
      }
      this.productorTrabajando = false;
    }
  }

  private async waitTime(number: number) {
    for (let i = 0; i < number; i++) {
      this.tiempo++
      await this.sleep(1000);
    }
  }

  caraOCruz() {
    // Generar un número aleatorio entre 0 y 1
    const resultado = Math.round(Math.random());

    // Si resultado es 0, es cara, de lo contrario, es cruz
    if (resultado === 0) {
      return 0;
    } else {
      return 1;
    }
  }

  cantidad = 0;

  async iniciarProductor() {
    if (this.contenedor.every(value => value.hasProduct)) {
      return
    }
    this.cantidad = this.getRandomInt(3, 7);
    while (this.cantidad != 0) {
      this.productorTrabajando = true;
      // Simular tiempo aleatorio de producción
      await this.waitTime(1);

      if (this.productorIndex == this.contenedor.length) {
        this.productorIndex = 0;
      }
      if (!this.contenedor[this.productorIndex].hasProduct) {
        this.contenedor[this.productorIndex] = {'hasProduct': true}
        this.productorIndex++;
        this.cantidad--
      } else {
        break
      }
    }
    this.cantidad = 0;
    this.productorTrabajando = false;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  async iniciarConsumidor() {
    if (this.contenedor.every(value => !value.hasProduct)) {
      return
    }
    this.cantidad = this.getRandomInt(3, 7);
    while (this.cantidad != 0) {
      this.consumidorTrabajando = true;
      // Simular tiempo aleatorio de producción
      await this.waitTime(1);

      if (this.consumidorIndex == this.contenedor.length) {
        this.consumidorIndex = 0;
      }
      if (this.contenedor[this.consumidorIndex].hasProduct) {

        this.contenedor[this.consumidorIndex] = {'hasProduct': false}
        this.consumidorIndex++;
        this.cantidad--
      } else {
        break
      }

    }
    this.cantidad = 0
    this.consumidorTrabajando = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isTrueDespiertoFalseDormido(condition: boolean) {
    return condition ? 'Despierto' : 'Dormido';
  }

}
