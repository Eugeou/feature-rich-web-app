/// <reference types="jest" />

declare global {
  const describe: typeof import("jest").describe;
  const it: typeof import("jest").it;
  const expect: typeof import("jest").expect;
  const beforeEach: typeof import("jest").beforeEach;
  const afterEach: typeof import("jest").afterEach;
  const beforeAll: typeof import("jest").beforeAll;
  const afterAll: typeof import("jest").afterAll;
}

export {};
