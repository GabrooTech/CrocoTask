import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, } from 'rxjs';
import { BehaviorSubject, throwError  } from 'rxjs';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = 'https://cms.crocobet.com/integrations';
  private imagePairsSource = new BehaviorSubject<any[]>([]);
  imagePairs$ = this.imagePairsSource.asObservable();
  constructor(private http: HttpClient) {}


  updateImagePairs(imagePairs: any[]) {
    this.imagePairsSource.next(imagePairs);
  }
  getSlotData(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/v2/slot/categories?include=games`)
  }
  getProvidersData(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}?type=slot&platform=desktop`)
  }
  getSlotsByProvidersData(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/v2/slot/providers/TPG@egt`)
  }
}
