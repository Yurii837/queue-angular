
import { InServiceComponent } from '../in-service/in-service.component';
import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Client } from '../../types';
import { Observable } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-in-line',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './in-line.component.html',
  styleUrl: './in-line.component.scss'
})
export class InLineComponent extends InServiceComponent {

  override dataSourceObservable$: Observable<Client[]> = this.clientService.inLineClients$
  override nextButton = true;

  name = new FormControl('', [Validators.required])

  createClient() {
    const newClient = new Client(this.name.value || '')
    this.clientService.postClients(newClient)
  }
}
