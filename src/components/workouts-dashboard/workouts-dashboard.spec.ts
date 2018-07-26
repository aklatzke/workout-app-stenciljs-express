import { TestWindow } from '@stencil/core/dist/testing';
import { WorkoutsDashboard } from './workouts-dashboard';

describe('app', () => {
  it('should build', () => {
    expect(new WorkoutsDashboard()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppHomeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [WorkoutsDashboard],
        html: '<app-home></app-home>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
