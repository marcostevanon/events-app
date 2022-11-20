import { render } from '@testing-library/react';

import FullpageLoading from './fullpage-loading';

describe('FullpageLoading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullpageLoading />);
    expect(baseElement).toBeTruthy();
  });
});
