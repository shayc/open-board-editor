import { render } from '@testing-library/react';
import Bar from './Bar';

describe('<Bar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(<Bar />);
    expect(spy).not.toHaveBeenCalled();
  });
});
