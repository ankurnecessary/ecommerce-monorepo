import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from '@/components/layout/Header';
import { userEvent, expect } from 'storybook/test';

const meta = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;
export default meta;
type story = StoryObj<typeof Header>;

export const OnDesktop: story = {
  play: async ({ canvas }) => {
    const navbarMenu = await canvas.findByTestId('navbar-menu');
    await expect(navbarMenu).toHaveClass('-translate-y-full');
    const link = canvas.getAllByText(/New In/i)[0];
    await userEvent.hover(link);
    await expect(navbarMenu).not.toHaveClass('-translate-y-full');
    await userEvent.unhover(link);
    await expect(navbarMenu).toHaveClass('-translate-y-full');
  },
};

export const OnMobile: story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  play: async ({ canvas }) => {
    const mobileMenu = canvas.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeInTheDocument();
    await expect(mobileMenu).toHaveClass('-translate-x-full');
    const hamburgerButton = canvas.getByLabelText(/Open navigation menu/i);
    await expect(hamburgerButton).toBeInTheDocument();
    await userEvent.click(hamburgerButton);
    await expect(mobileMenu).not.toHaveClass('-translate-x-full');
    const closeButton = canvas.getByLabelText(/Close Menu/i);
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await expect(mobileMenu).toHaveClass('-translate-x-full');
  },
};
