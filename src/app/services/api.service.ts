import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map, Observable} from "rxjs";
import {ApiResponse, DataRequest, Gateway, Project, Report, User} from "../app.models";

@Injectable({providedIn: 'root'})
export class ApiService {
  private api = 'http://178.63.13.157:8090/mock-api/api';

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<ApiResponse>(`${this.api}/users`).pipe(
      filter((res: ApiResponse) => !!res?.data?.length),
      map((res: ApiResponse) => res.data[0]),
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse>(`${this.api}/projects`).pipe(
      filter((res: ApiResponse) => !!res?.data),
      map((res: ApiResponse) => res.data)
    );
  }

  getGateways(): Observable<Gateway[]> {
    return this.http.get<ApiResponse>(`${this.api}/gateways`).pipe(
      filter((res: ApiResponse) => !!res?.data),
      map((res: ApiResponse) => res.data)
    );
  }

  getReport(request: DataRequest): Observable<Report[]> {
    return this.http.post<ApiResponse>(`${this.api}/report`, request).pipe(
      map((res: ApiResponse) => res.data)
    );
  }
}
