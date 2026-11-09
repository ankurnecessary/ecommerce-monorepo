import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NavbarMobileLink from './NavbarMobileLink';

describe('NavbarMobileLink', () => {
  it('should load a link', () => {
    const ALink = {
      id: 'fkjffh1',
      url: '/newIn',
      name: 'New In',
    };
    const { getByRole } = render(<NavbarMobileLink link={ALink} />);
    const link = getByRole('link', { name: /new in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/category/newIn');
  });
});
