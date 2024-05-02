import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './types';
import { BehaviorSubject, Observable, first, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  readonly Host = 'https://6061cac0ac47190017a71c0d.mockapi.io/api/';

  private _inServiceClients$ = new BehaviorSubject<Client[]>([])
  private _inLineClients$ = new BehaviorSubject<Client[]>([])

  get inServiceClients$ () {
    return this._inServiceClients$.asObservable()
  }

  get inServiceClients () {
    return this._inServiceClients$.value
  }

  get inLineClients$ () {
    return this._inLineClients$.asObservable()
  }
  get inLineClients () {
    return this._inLineClients$.value
  }

  constructor(
    private http: HttpClient,
  ) { }

  inServiceFilter(responceClients: Client[]) {
    return [responceClients.filter(item => item.Status == 1)[0]]
  }

  inLineFilter(responceClients: Client[]) {
    return responceClients.filter(item => item.Status == 0)
  }

  public getClients() {
    this.http.get<Client[]>(this.Host+`Users/Persons`)
      .pipe(
        first()
      )
      .subscribe(clients => {
        this._inLineClients$.next(this.inLineFilter(clients))
        this._inServiceClients$.next(this.inServiceFilter(clients))
      })
  }

  public postClients(client: Client) {
    this.http.post<Client[]>(this.Host+`Users/Persons`, client)
      .pipe(
        first()
      )
      .subscribe(client => {
        this.getClients();
      })
  }

  public nextClient() {

    const processingClient: Client = {...this.inLineClients.sort((prev, curr) => +curr.id - +prev.id)[0], Status: 1};
    const processedClient: Client = {...this.inServiceClients[0], Status: 2};

    const combined$: Observable<[Client, Client]> = forkJoin([
      this.http.put<Client>(this.Host+`Users/Persons/${processingClient.id}`, processingClient),
      this.http.put<Client>(this.Host+`Users/Persons/${processedClient.id}`, processedClient),
    ]);

    combined$
      .pipe(
        first()
      )
      .subscribe(() => {
        this.getClients();
      })
  }



}
