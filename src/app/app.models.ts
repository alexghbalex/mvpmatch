import {HttpStatusCode} from "@angular/common/http";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export interface Project {
  description: string;
  gatewayIds: string[];
  image: string
  industry: string;
  name: string;
  projectId: string;
  rule: string;
  structure: string;
  userIds: string[];
  website: string;
}

export interface Gateway {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
}

export interface Report {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}

export type DataResponse = User & Project & Gateway & Report;

export interface ApiResponse {
  code: HttpStatusCode;
  data: DataResponse[];
  error: unknown;
}

export interface DataRequest {
  from: string;
  to: string;
  projectId: string;
  gatewayId: string;
}

