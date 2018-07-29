import { TestWindow } from '@stencil/core/testing';
import { WorkoutList } from './workout-list';

describe('workout-list', () => {
  it('should build', () => {
    expect(new WorkoutList()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLWorkoutListElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [WorkoutList],
        html: '<workout-list></workout-list>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing

  });
});
