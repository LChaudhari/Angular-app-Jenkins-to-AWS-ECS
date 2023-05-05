import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config = {};

  public get config(): any {
    return this._config;
  }

  public get apiUrl(): string {
    return this._config['apiUrl'];
  }

  public get environment(): string {
    return this._config['environment'];
  }

  constructor() {
    const prefix = 'APP_ENV_VAR_';
    Object.getOwnPropertyNames(<any>window)
      .filter(prop => prop.startsWith(prefix))
      .forEach(prop => {
        const key = prop.replace(prefix, '');
        this._config[key] = (<any>window)[prop]
      });
  }

  public getValue(key: string): string {
    return this[key];
  }
}
