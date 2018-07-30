import { TestWindow } from '@stencil/core/testing';
import { ExerciseSingle } from './exercise-single';

describe('exercise-single', () => {
  it('should build', () => {
    expect(new ExerciseSingle()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLExerciseSingleElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ExerciseSingle],
        html: '<exercise-single></exercise-single>'
      });
    });
  });
});
