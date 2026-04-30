import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private readonly searchQuerySubject = new BehaviorSubject<string>('');
  private readonly searchTypeSubject = new BehaviorSubject<'artists' | 'albums'>('artists');

  searchQuery$ = this.searchQuerySubject.asObservable();
  searchType$ = this.searchTypeSubject.asObservable();

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setSearchType(type: 'artists' | 'albums') {
    this.searchTypeSubject.next(type);
  }

  getCurrentQuery() {
    return this.searchQuerySubject.getValue();
  }

  getCurrentType() {
    return this.searchTypeSubject.getValue();
  }
}
