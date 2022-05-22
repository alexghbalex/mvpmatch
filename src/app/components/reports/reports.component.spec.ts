import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsComponent} from './reports.component';
import {ApiService} from "../../services/api.service";
import {of} from "rxjs";

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      providers: [
        {
          provide: ApiService, useValue: {
            getProjects: () => of([]),
            getGateways: () => of([]),
            getReport: () => of({})
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
