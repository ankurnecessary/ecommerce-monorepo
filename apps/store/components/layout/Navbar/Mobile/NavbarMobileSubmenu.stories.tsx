import { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarMobileSubmenu from '@/components/layout/Navbar/Mobile/NavbarMobileSubmenu';

const meta = {
  title: 'components/layout/Navbar/Mobile/NavbarMobileSubmenu',
  component: NavbarMobileSubmenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavbarMobileSubmenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subcategories: [
      {
        name: 'Shirt',
        id: '1jljlk',
        url: '/Shirt',
        imagePath: 'https://picsum.photos/id/1/55/55',
      },
      {
        id: '2sdhfskdhfs',
        name: 'T-Shirt',
        url: '/2sdhfskdhfs',
        imagePath: 'https://picsum.photos/id/2/55/55',
      },
      {
        name: 'Pullovers',
        id: '3ljfdsjfpoit',
        url: '/Pullovers',
        imagePath: 'https://picsum.photos/id/3/55/55',
      },
      {
        name: 'Hoodies',
        id: '4jldsjxmv',
        url: '/Hoodies',
        imagePath: 'https://picsum.photos/id/4/55/55',
      },
      {
        name: 'Pants',
        id: '5mxcnvlsd',
        url: '/Pants',
        imagePath: 'https://picsum.photos/id/5/55/55',
      },
      {
        name: 'Socks',
        id: '6sflskfj',
        url: '/Socks',
        imagePath: 'https://picsum.photos/id/6/55/55',
      },
      {
        name: 'Watches',
        id: '7lsjflsj',
        url: '/Watches',
        imagePath: 'https://picsum.photos/id/7/55/55',
      },
    ],
  },
};

export const NotFound: Story = {
  args: {
    subcategories: [],
  },
};
