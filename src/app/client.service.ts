import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './types';
import { BehaviorSubject, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  readonly Host = 'https://6061cac0ac47190017a71c0d.mockapi.io/api/';
  private _clients$ = new BehaviorSubject<Client[]>([])

  get clients$ () {
    return this._clients$.asObservable()
  }

  constructor(
    private http: HttpClient,
  ) { }

  public getClients() {
    this.http.get<Client[]>(this.Host+`Users/Persons`)
      .pipe(
        first()
      )
      .subscribe(clients => {
        this._clients$.next(clients)
      })
  }

}
