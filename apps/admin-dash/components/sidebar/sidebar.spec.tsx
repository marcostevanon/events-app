import { render } from '@testing-library/react';
import SidebarWithHeader from './sidebar';

describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SidebarWithHeader>
        <></>
      </SidebarWithHeader>
    );
    expect(baseElement).toBeTruthy();
  });
});
