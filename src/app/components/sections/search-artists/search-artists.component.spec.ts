import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtistsComponent } from './search-artists.component';

describe('SearchArtistsComponent', () => {
  let component: SearchArtistsComponent;
  let fixture: ComponentFixture<SearchArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
