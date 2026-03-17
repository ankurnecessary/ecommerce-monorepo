import { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarMobileLink from '@/components/layout/Navbar/Mobile/NavbarMobileLink';

const meta = {
  title: 'components/layout/Navbar/Mobile/NavbarMobileLink',
  component: NavbarMobileLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavbarMobileLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    link: {
      url: '/menclothing',
      name: 'Men Clothing',
    },
  },
};
