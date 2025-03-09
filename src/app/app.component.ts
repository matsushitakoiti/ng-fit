import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type WeightEntry = {
  date: string;
  weight: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-fit';
  weight = 0;

  
  // updateWeight(event:Event):void {
  //   const input = event.target as HTMLInputElement
  //   this.weight = Number(input.value);
  // }

  save():void {
    const data:WeightEntry = {
      date: "2025.03.09",
      weight: this.weight
    }
    console.log(data)
  }
}
