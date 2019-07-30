import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../component/models/user';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  // it('should be created', () => {
  //   const service: AuthService = TestBed.get(AuthService);
  //   expect(service).toBeTruthy();
  // });

  it('should be initialized',
      inject([AuthService], (authService: AuthService) => {
        expect(authService).toBeTruthy();
      })
  );
});
