import { TestWindow } from '@stencil/core/testing';
import { ExerciseSpecific } from './exercise-specific';

describe('exercise-specific', () => {
  it('should build', () => {
    expect(new ExerciseSpecific()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLExerciseSpecificElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ExerciseSpecific],
        html: '<exercise-specific></exercise-specific>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing

  });
});
