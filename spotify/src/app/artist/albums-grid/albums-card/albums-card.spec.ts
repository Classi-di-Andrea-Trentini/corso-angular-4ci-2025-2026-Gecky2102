import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCard } from './albums-card';

describe('AlbumsCard', () => {
  let component: AlbumsCard;
  let fixture: ComponentFixture<AlbumsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
