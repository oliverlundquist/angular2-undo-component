/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Store} from './store';

describe('Store', () => {
  it('should create an instance', () => {
    expect(new Store()).toBeTruthy();
  });
});
