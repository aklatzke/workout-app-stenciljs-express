import { TestWindow } from '@stencil/core/testing';
import { ActiveWorkoutBar } from './active-workout-bar';

describe('active-workout-bar', () => {
  it('should build', () => {
    expect(new ActiveWorkoutBar()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLActiveWorkoutBarElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ActiveWorkoutBar],
        html: '<active-workout-bar></active-workout-bar>'
      });
    });

  });
});
