import { TestWindow } from '@stencil/core/testing';
import { NewWorkout } from './new-workout';

describe('new-workout', () => {
  it('should build', () => {
    expect(new NewWorkout()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLNewWorkoutElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [NewWorkout],
        html: '<new-workout></new-workout>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
