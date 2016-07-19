/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { UndoComponent } from './undo.component';

describe('Component: Undo', () => {
  it('should create an instance', () => {
    let component = new UndoComponent();
    expect(component).toBeTruthy();
  });
});
