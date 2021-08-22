import { render } from '@testing-library/react';
import DelayedRender from './DelayedRender';

describe('<DelayedRender />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(<DelayedRender delay={300}>content</DelayedRender>);
    expect(spy).not.toHaveBeenCalled();
  });
});
