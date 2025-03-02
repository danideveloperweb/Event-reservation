import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }
}
