import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtist } from './search-artist';

describe('SearchArtist', () => {
  let component: SearchArtist;
  let fixture: ComponentFixture<SearchArtist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchArtist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchArtist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
