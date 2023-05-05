import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private configService: ConfigService) { }

  public getApiData() {
    return this.http.get(this.configService.apiUrl);
  }
}
