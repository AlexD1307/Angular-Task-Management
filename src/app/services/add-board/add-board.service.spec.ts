import { TestBed } from '@angular/core/testing';

import { AddBoardService } from './add-board.service';

describe('AddBoardService', () => {
  let service: AddBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
