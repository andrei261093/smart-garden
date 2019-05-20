import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IDevice } from './device';
import { IPin } from './pin';
import { IDeviceCommand } from './device-command';
import { IActivePin } from './active-pin';

@Injectable()
export class ApiService {

  private _server_url: string = "http://andrei261093.go.ro:8080/garden/api";

  constructor(private http:HttpClient) { }

  getDevices(): Observable<IDevice[]>{
    return this.http.get<IDevice[]>(this._server_url + "/user/1/devices")
                    .pipe(tap(data =>(console.log(""))) , catchError(this.errorHandler))
  }

  getActivePins(): Observable<IActivePin[]>{
    return this.http.get<IActivePin[]>(this._server_url + "/user/1/devices/active-pins")
                    .pipe(tap(data =>(console.log(""))) , catchError(this.errorHandler))
  }

  getPins(deviceId: number): Observable<IPin[]>{
    return this.http.get<IPin[]>(this._server_url + "/device/" + deviceId + "/pins")
                    .pipe(tap(data =>(console.log(""))) , catchError(this.errorHandler))
  }

  sendCommand (deviceCommand: IDeviceCommand): Observable<IDeviceCommand> {
    return this.http.post<IDeviceCommand>(this._server_url + "/switch", deviceCommand)
     .pipe();
   }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

}