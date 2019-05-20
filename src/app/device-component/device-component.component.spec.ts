import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComponentComponent } from './device-component.component';

describe('DeviceComponentComponent', () => {
  let component: DeviceComponentComponent;
  let fixture: ComponentFixture<DeviceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
