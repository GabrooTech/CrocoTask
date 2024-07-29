import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImagePair } from '../main/filter/filter.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = 'https://cms.crocobet.com/integrations';
  private imagePairsSubject = new BehaviorSubject<ImagePair[]>([]);
  imagePairs$ = this.imagePairsSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  updateImagePairs(imagePairs: ImagePair[]): void {
    this.imagePairsSubject.next(imagePairs);
  }

  getSlotData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v2/slot/categories?include=games`);
  }

  getProvidersData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?type=slot&platform=desktop`);
  }

  getSlotsByProvidersData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v2/slot/providers/TPG@egt`);
  }
}