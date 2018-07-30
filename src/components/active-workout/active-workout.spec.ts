import { TestWindow } from '@stencil/core/testing';
import { ActiveWorkout } from './active-workout';

describe('active-workout', () => {
  it('should build', () => {
    expect(new ActiveWorkout()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLActiveWorkoutElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ActiveWorkout],
        html: '<active-workout></active-workout>'
      });
    });

  });
});
