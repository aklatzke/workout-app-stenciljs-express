import { TestWindow } from '@stencil/core/dist/testing';
import { DisplayWorkouts } from './display-workouts';

describe('app', () => {
  it('should build', () => {
    expect(new DisplayWorkouts()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppHomeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DisplayWorkouts],
        html: '<app-home></app-home>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
