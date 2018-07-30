import { TestWindow } from '@stencil/core/testing';
import { AddExercise } from './add-exercise';

describe('add-exercise', () => {
  it('should build', () => {
    expect(new AddExercise()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAddExerciseElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AddExercise],
        html: '<add-exercise></add-exercise>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
