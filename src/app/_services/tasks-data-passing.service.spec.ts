/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TasksDataPassingService } from './tasks-data-passing.service';

describe('Service: TasksDataPassing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksDataPassingService]
    });
  });

  it('should ...', inject([TasksDataPassingService], (service: TasksDataPassingService) => {
    expect(service).toBeTruthy();
  }));
});
