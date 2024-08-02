import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse, CategoryItem } from '../model/api-response.model';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = environment.baseUrl;
  private jsonUrl = environment.jsonUrl;
  private imagePairsSource = new BehaviorSubject<any[]>([]);
  imagePairs$ = this.imagePairsSource.asObservable();

  constructor(private http: HttpClient) {}

  updateImagePairs(imagePairs: any[]) {
    this.imagePairsSource.next(imagePairs);
  }

  getSlotData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/v2/slot/categories?include=games`)
      .pipe(
        catchError(this.handleError) 
      );
  }

  getProvidersData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?type=slot&platform=desktop`)
      .pipe(
        catchError(this.handleError) 
      );
  }

  getSlotsByProvidersData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v2/slot/providers/pragmatic?platform=desktop`)
      .pipe(
        catchError(this.handleError) 
      );
  }

  getSidebarItems(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  fetchAndFilterCategories(): Observable<CategoryItem[]> {
    return this.getSlotData().pipe(
      map(response => response.data.slice(1).filter(this.filterCategory)), 
      catchError(this.handleError)
    );
  }

  private filterCategory(item: CategoryItem): any {
    return item.name &&
           item.platform !== 'mobile' &&
           !/MOB|mobile|mob/i.test(item.category || '') &&
           (item.group === '' || item.group === undefined) &&
           (item.games && item.games.length > 0);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return of(null); 
  }
}