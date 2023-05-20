import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'PmYoyrNJUlptKppYJNhajYVh7S70R2xk';
  private _baseUrlGifs: string = 'https://api.giphy.com/v1/gifs/search';
  private _tagsHistory: string[] = [];

  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  orderHistoryTags(tag: string): void {
    if (this._tagsHistory.includes(tag)) {
      const index = this._tagsHistory.indexOf(tag);
      this._tagsHistory.splice(index, 1);
    }
  }

  limitHistoryTags(): void {
    if (this._tagsHistory.length === 10) {
      this._tagsHistory.pop();
    }
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if (!history) return;

    this._tagsHistory = JSON.parse(history);
    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    const tagLowerCase = tag.toLowerCase();
    this.orderHistoryTags(tagLowerCase);
    this.limitHistoryTags();

    this._tagsHistory.unshift(tagLowerCase);
    this.saveLocalStorage();

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tagLowerCase);

    this.http
      .get<SearchResponse>(this._baseUrlGifs, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });
  }
}
