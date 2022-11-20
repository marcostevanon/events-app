import { render } from '@testing-library/react';

import Channels from './channels';

describe('Channels', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Channels />);
    expect(baseElement).toBeTruthy();
  });
});
