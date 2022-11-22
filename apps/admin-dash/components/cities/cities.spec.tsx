import { render } from '@testing-library/react';

import Cities from './cities';

describe('Cities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cities />);
    expect(baseElement).toBeTruthy();
  });
});
