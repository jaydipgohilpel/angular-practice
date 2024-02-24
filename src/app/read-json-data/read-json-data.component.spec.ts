import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadJsonDataComponent } from './read-json-data.component';

describe('ReadJsonDataComponent', () => {
  let component: ReadJsonDataComponent;
  let fixture: ComponentFixture<ReadJsonDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadJsonDataComponent]
    });
    fixture = TestBed.createComponent(ReadJsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
