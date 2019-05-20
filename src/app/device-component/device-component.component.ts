import { Component, OnInit, Input } from '@angular/core';
import { IDevice } from '../services/device';
import { ApiService } from '../services/service-api.service';
import { IPin } from '../services/pin';
import { ICommand } from '../services/command';
import { IDeviceCommand } from '../services/device-command';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-device-component',
  templateUrl: './device-component.component.html',
  styleUrls: ['./device-component.component.css']
})
export class DeviceComponentComponent implements OnInit {
  public pins: Array<IPin>;
  @Input() device: IDevice;
  public errorMsg;
  private serverUrl = 'http://andrei261093.go.ro:8888/socket'
  private stompClient;

  constructor(private _apiService: ApiService) {
    this.initializeWebSocketConnection();
   }

  ngOnInit() {
    console.log("andrei " + this.device.id);
  }

  getPins(){
    this._apiService.getPins(this.device.id)
    .subscribe(data => this.pins = data,
              error => this.errorMsg = error);
  }

  switchEvent(pin :IPin){
    pin.state = !pin.state;
    let command = {} as ICommand;
    command.state = pin.state;
    command.relayIndex = pin.numberOnDevice;
    command.noOfMinutes = pin.expiration_time;

    let deviceCommand = {} as IDeviceCommand;
    deviceCommand.pinId = pin.id;
    deviceCommand.command = command;

    this._apiService.sendCommand(deviceCommand).subscribe()
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        that._apiService.getPins(that.device.id).subscribe(data => that.pins = data,
          error => that.errorMsg = error);
      });
    });
  }

}
