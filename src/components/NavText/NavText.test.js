import React from 'react';
import { render } from '@testing-library/react';
import NavText from './NavText';

describe('<NavText />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(<NavText />);
    expect(spy).not.toHaveBeenCalled();
  });
});
