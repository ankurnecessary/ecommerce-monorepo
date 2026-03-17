import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import NavbarScroller from '@/components/layout/Navbar/Desktop/NavbarScroller';
import MockHeaderContextProvider from '@/components/layout/Header/Header.context.stories.mock';
import { expect, waitFor } from 'storybook/test';
const meta = {
  title: 'components/layout/Navbar/Desktop/NavbarScroller',
  component: NavbarScroller,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
} satisfies Meta<typeof NavbarScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    overrides: {
      desktop: {
        navbar: {
          child: {
            getBoundingClientRect: () => ({
              width: 1500,
            }),
          },
          parent: {
            getBoundingClientRect: () => ({
              width: 1200,
            }),
          },
          childOffset: 0,
          setNavbarOffsetDsktp: action('setNavbarOffsetDsktp'),
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const leftButton = await canvas.findByLabelText('left scroller');
    await expect(leftButton).toBeInTheDocument();
    await expect(leftButton).toBeDisabled();
    const rightButton = await canvas.findByLabelText('right scroller');
    await expect(rightButton).toBeInTheDocument();
    await waitFor(() => expect(rightButton).toBeEnabled(), { timeout: 1000 });
  },
};

export const BothButtonsEnabled: Story = {
  args: {},
  parameters: {
    overrides: {
      desktop: {
        navbar: {
          child: {
            getBoundingClientRect: () => ({
              width: 1500,
            }),
          },
          parent: {
            getBoundingClientRect: () => ({
              width: 1200,
            }),
          },
          childOffset: -10,
          setNavbarOffsetDsktp: action('setNavbarOffsetDsktp'),
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const leftButton = await canvas.findByLabelText('left scroller');
    await expect(leftButton).toBeInTheDocument();
    await expect(leftButton).toBeEnabled();
    const rightButton = await canvas.findByLabelText('right scroller');
    await expect(rightButton).toBeInTheDocument();
    await expect(rightButton).toBeEnabled();
  },
};

export const OnlyLeftButtonEnabled: Story = {
  args: {},
  parameters: {
    overrides: {
      desktop: {
        navbar: {
          child: {
            getBoundingClientRect: () => ({
              width: 2303,
            }),
          },
          parent: {
            getBoundingClientRect: () => ({
              width: 1087,
            }),
          },
          childOffset: -1216,
          setNavbarOffsetDsktp: action('setNavbarOffsetDsktp'),
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const leftButton = await canvas.findByLabelText('left scroller');
    await expect(leftButton).toBeInTheDocument();
    await expect(leftButton).toBeEnabled();
    const rightButton = await canvas.findByLabelText('right scroller');
    await expect(rightButton).toBeInTheDocument();
    await waitFor(() => expect(rightButton).toBeDisabled(), { timeout: 1000 });
  },
};
