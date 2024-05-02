import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ClientService } from '../../client.service';
import { CommonModule } from '@angular/common';
import { Client } from '../../types';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-in-service',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatDividerModule],
  templateUrl: './in-service.component.html',
  styleUrl: './in-service.component.scss'
})



export class InServiceComponent implements OnInit {

  dataSourceObservable$: Observable<Client[]> = this.clientService.inServiceClients$
  nextButton = true;

  displayedColumns: string[] = ['id', 'FullName', 'dateTime'];
  dataSource: Client[] = [];

  constructor (public clientService: ClientService) {
  }

  dateMapCalback(item: Client): Client {
    return {
      ...item,
      dateTime: item?.dateTime && new Date(item.dateTime).toLocaleTimeString().slice(0, -3)
    }
  }

  ngOnInit(): void {

    this.dataSourceObservable$
      .subscribe(list => {
        this.dataSource = list.map(this.dateMapCalback)
      })
  }

  nextClientHandle() {
    this.clientService.nextClient()
  }

}
