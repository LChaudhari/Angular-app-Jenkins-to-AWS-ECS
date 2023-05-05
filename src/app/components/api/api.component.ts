import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  apiData$: Observable<any>;
  apiUrl: string;
  env: string;

  constructor(private apiService: ApiService, private configService: ConfigService) { }

  ngOnInit() {
    this.apiData$ = this.apiService.getApiData();
    this.apiUrl = this.configService.apiUrl;
    this.env = this.configService.environment;
  }
}
