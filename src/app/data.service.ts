import { Injectable } from '@angular/core';

export type WeightEntry = {
  date: string;
  weight: number;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  

  getData(): WeightEntry[] {
    // Caso não tenha o item no localStorage fazer o parse do "[]" simulando uma lista gravada vazia
    // return JSON.parse(localStorage.getItem("ng-fit-weights") || "[]");
    
    const data: string | null = localStorage.getItem('ng-fit-weights');
    if (!data) return [];
    return JSON.parse(data);
  }

  setData(data: WeightEntry[]): void {
    localStorage.setItem('ng-fit-weights', JSON.stringify(data));
  }
}
