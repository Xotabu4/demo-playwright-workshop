import { APIRequestContext } from "@playwright/test";

export abstract class RequestHolder {
  constructor(protected request: APIRequestContext) {}
}
