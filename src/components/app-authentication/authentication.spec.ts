import { TestWindow } from '@stencil/core/dist/testing';
import { Authentication } from './authentication';

describe('app', () => {
  it('should build', () => {
    expect(new Authentication()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppHomeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Authentication],
        html: '<app-home></app-home>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
