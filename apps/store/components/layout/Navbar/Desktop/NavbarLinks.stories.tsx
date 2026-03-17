import { Meta } from '@storybook/nextjs-vite';
import NavbarLinks from '@/components/layout/Navbar/Desktop/NavbarLinks';
import { fn } from 'storybook/test';
import type { StoryObj } from '@storybook/nextjs-vite';
import MockHeaderContextProvider from '@/components/layout/Header/Header.context.stories.mock';
import { expect } from 'storybook/test';

const meta = {
  title: 'components/layout/Navbar/Desktop/NavbarLinks',
  component: NavbarLinks,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    mouseOverHandler: {
      control: fn(),
      description: 'Handler for mouse over events on navbar links',
    },
    mouseOutHandler: {
      control: fn(),
      description: 'Handler for mouse out events on navbar links',
    },
  },
  decorators: [
    (Story, context) => {
      const overrides = context?.parameters?.overrides || {};
      return (
        <MockHeaderContextProvider overrides={overrides}>
          <Story />
        </MockHeaderContextProvider>
      );
    },
  ],
} satisfies Meta<typeof NavbarLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = [
  {
    id: 'fkjffh1',
    url: '/newIn',
    name: 'New In',
    subcategories: [],
  },
  {
    id: 'fkjffh2',
    url: '/sale',
    name: 'Sale',
    subcategories: [],
  },
  {
    id: 'fkjffh3',
    url: '/womenClothing',
    name: 'Women Clothing',
    subcategories: [],
  },
];
export const Default: Story = {
  args: {
    mouseOverHandler: () => () => {},
    mouseOutHandler: () => () => {},
  },
  parameters: {
    overrides: {
      navLinks: links,
      desktop: {
        selectedHorizontalNavLink: links[1].name,
      },
    },
  },
  play: async ({ canvas }) => {
    const linkElements = canvas.queryAllByRole('link');
    await expect(linkElements.length).toBe(links.length);
    const link = canvas.getByText(links[1].name);
    await expect(link).toHaveClass('bg-gray-100');
  },
};

export const Loading: Story = {
  args: {
    mouseOverHandler: () => () => {},
    mouseOutHandler: () => () => {},
  },
  parameters: {
    overrides: {
      navLinks: [],
    },
  },
  play: async ({ canvas }) => {
    const linkElements = canvas.queryAllByRole('link');
    await expect(linkElements.length).toBe(0);
  },
};

// [x]: Add dark and light mode in the stories of storybook.
