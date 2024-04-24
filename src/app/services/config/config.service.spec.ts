import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', () => {
    const mockConfig = {
      "serverProtocol": "http",
      "baseIndexHref": "/",
      "useUserCard": true
    };

    service.configLoad();
    const req = httpMock.expectOne('assets/config/config.json');
    req.flush(mockConfig);

    expect(ConfigService.config).toEqual(mockConfig);
  });

  it('should load config using promise', (done: DoneFn) => {
    const mockConfig = {
      "serverProtocol": "http",
      "baseIndexHref": "/",
      "useUserCard": true
    };

    service.loadPromise().then(() => {
      expect(ConfigService.config).toEqual(mockConfig);
      done();
    });

    const req = httpMock.expectOne('assets/config/config.json');
    req.flush(mockConfig);
  });

  it('should handle error if config loading fails', (done: DoneFn) => {
    const errorMessage = '404 Not Found';

    service.loadPromise().catch((error: any) => {
      expect(error).toBe(`Ошибка при загрузки файла 'assets/config/config.json': ${errorMessage}`);
      done();
    });

    const req = httpMock.expectOne('assets/config/config.json');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
