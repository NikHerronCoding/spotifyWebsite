import { TestBed } from '@angular/core/testing';

import { LikedSongsServiceService } from './liked-songs-service.service';

describe('LikedSongsServiceService', () => {
  let service: LikedSongsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedSongsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
