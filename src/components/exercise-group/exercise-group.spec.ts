import { TestWindow } from '@stencil/core/testing';
import { ExerciseGroup } from './exercise-group';

describe('exercise-group', () => {
  it('should build', () => {
    expect(new ExerciseGroup()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLExerciseGroupElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ExerciseGroup],
        html: '<exercise-group></exercise-group>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
