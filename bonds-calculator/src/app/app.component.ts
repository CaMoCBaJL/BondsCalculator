import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BondsEntitiesService } from 'bonds-entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bonds-calculator';
  constructor(private readonly _bondsService: BondsEntitiesService){

  }
}
