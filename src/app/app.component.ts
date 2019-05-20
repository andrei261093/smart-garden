import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/service-api.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public devices = [];
  public activePins = [];
  public errorMsg;
  title = 'smart-garden';
  panelOpenState = false;
  private serverUrl = 'http://andrei261093.go.ro:8888/socket'
  private stompClient;

  constructor(private _apiService: ApiService, private snackBar: MatSnackBar) {
    this.initializeWebSocketConnection();
   }

  ngOnInit(): void {
    this._apiService.getDevices()
      .subscribe(data => this.devices = data,
                error => this.errorMsg = error);

    this._apiService.getActivePins()
    .subscribe(data => this.activePins = data,
              error => this.errorMsg = error);
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        that._apiService.getActivePins()
        .subscribe(data => {
          that.activePins = data
        },
          error => that.errorMsg = error);
          that.openSnackBar("Starea dispozitivului s-a schimbat!", "OK")
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
