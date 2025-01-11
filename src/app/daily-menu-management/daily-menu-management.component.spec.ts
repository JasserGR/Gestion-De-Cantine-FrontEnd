import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMenuManagementComponent } from './daily-menu-management.component';

describe('DailyMenuManagementComponent', () => {
  let component: DailyMenuManagementComponent;
  let fixture: ComponentFixture<DailyMenuManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMenuManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMenuManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
