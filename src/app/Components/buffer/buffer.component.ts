import {Component, Input} from '@angular/core';
import {element} from "../Element";

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrl: './buffer.component.css'
})
export class BufferComponent {
  @Input() contenedor!: element[];

}
