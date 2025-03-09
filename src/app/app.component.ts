import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { WeightEntry, DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    ReactiveFormsModule,
    // JsonPipe,
    DatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-fit';
  // injetando um serviço de dados
  private dataService = inject(DataService);

  // Lista de pesagem
  weightEntries = signal<WeightEntry[]>(this.dataService.getData());

  // criação de formulário reativo
  private fb = inject(FormBuilder);
  nowDate = new Date().toISOString();
  weightEntryForm = this.fb.nonNullable.group({
    date: [this.nowDate, Validators.required],
    weight: [0, { validators: [Validators.required, Validators.min(0)] }],
  });

  
  // Setar campos como touched para mostrar erro quando valor alterado e não no blur
  formValue = toSignal(this.weightEntryForm.valueChanges);
  formValueEffect = effect(() => {
    this.formValue();
    this.weightEntryForm.markAllAsTouched();
  });

  

  // updateWeight(event:Event):void {
  //   const input = event.target as HTMLInputElement
  //   this.weight = Number(input.value);
  // }

  save(): void {
    const data: WeightEntry = this.weightEntryForm.getRawValue();

    // create new entry based on last array + new item on index 0
    const entries = [data, ...this.weightEntries()];

    // sort to show always most recent on top
    entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // set signal with updated array
    this.weightEntries.set(entries);

    this.dataService.setData(this.weightEntries());

    // Limpar o formulário
    // this.weightEntryForm.reset();

    // this.weightEntries.update((entries) =>
    //   [data, ...entries].sort(
    //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    //   )
    // );
  }

  deleteEntry(date: string) {
    this.weightEntries.update((entries) =>
      entries.filter((entry) => entry.date !== date)
    );
    this.dataService.setData(this.weightEntries());
  }
}
