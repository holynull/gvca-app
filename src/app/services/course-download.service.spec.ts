import { TestBed } from '@angular/core/testing';

import { CourseDownloadService } from './course-download.service';

describe('CourseDownloadService', () => {
  let service: CourseDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
