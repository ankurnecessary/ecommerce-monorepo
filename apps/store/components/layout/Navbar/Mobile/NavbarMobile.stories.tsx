import { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarMobile from '@/components/layout/Navbar/Mobile/NavbarMobile';
import MockHeaderContextProvider from '@/components/layout/Header/Header.context.stories.mock';
import { links } from '@/components/layout/Navbar/XnavbarLinkObj';

const meta = {
  title: 'components/layout/Navbar/Mobile/NavbarMobile',
  component: NavbarMobile,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  decorators: [
    (Story, context) => {
      const overrides = context?.parameters?.overrides || { navLinks: links };
      return (
        <MockHeaderContextProvider overrides={overrides}>
          <Story />
        </MockHeaderContextProvider>
      );
    },
  ],
} satisfies Meta<typeof NavbarMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    overrides: {
      navLinks: links,
      mobile: {
        isMenuVisible: true,
        toggleMenu: () => {},
      },
    },
  },
};

export const LinksNotFound: Story = {
  args: {},
  parameters: {
    overrides: {
      navLinks: [],
      mobile: {
        isMenuVisible: true,
        toggleMenu: () => {},
      },
    },
  },
};
