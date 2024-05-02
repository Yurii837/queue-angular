import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InLineComponent } from './components/in-line/in-line.component';
import { InServiceComponent } from './components/in-service/in-service.component';
import { ClientService } from './client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule,
    InLineComponent,
    InServiceComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor (public clientService: ClientService) {
    this.clientService.getClients()
}
}
