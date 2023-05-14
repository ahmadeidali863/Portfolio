import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesImagesComponent } from './admin-categories-images.component';

describe('AdminCategoriesImagesComponent', () => {
  let component: AdminCategoriesImagesComponent;
  let fixture: ComponentFixture<AdminCategoriesImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminCategoriesImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
