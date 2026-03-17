import { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarSubcategories from '@/components/layout/Navbar/Desktop/NavbarSubcategories';
import { expect } from 'storybook/test';

const meta = {
  title: 'components/layout/Navbar/Desktop/NavbarSubcategories',
  component: NavbarSubcategories,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavbarSubcategories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      id: 'fkjffh2',
      url: '/sale',
      name: 'Sale',
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
        {
          name: 'Sweat Shirts',
          id: '8lsjflsj',
          url: '/Sweat',
          imagePath: 'https://picsum.photos/id/8/55/55',
        },
        {
          name: 'Shorts',
          id: '9lsjflsj',
          url: '/Shorts',
          imagePath: 'https://picsum.photos/id/9/55/55',
        },
        {
          name: 'Joggers',
          id: '10lsjflsj',
          url: '/Joggers',
          imagePath: 'https://picsum.photos/id/10/55/55',
        },
        {
          name: 'Zip-up Hoodies',
          id: '11lsjflsj',
          url: '/Zip',
          imagePath: 'https://picsum.photos/id/11/55/55',
        },
        {
          name: 'Sweaters',
          id: '12lsjflsj',
          url: '/Sweaters',
          imagePath: 'https://picsum.photos/id/12/55/55',
        },
        {
          name: 'Denims',
          id: '13lsjflsj',
          url: '/Denims',
          imagePath: 'https://picsum.photos/id/13/55/55',
        },
        {
          name: 'Shirt and Sweatshirts',
          id: '14jljlk',
          url: '/Shirt',
          imagePath: 'https://picsum.photos/id/14/55/55',
        },
        {
          id: '15sdhfskdhfs',
          name: 'T-Shirt',
          url: '/15sdhfskdhfs',
          imagePath: 'https://picsum.photos/id/15/55/55',
        },
        {
          name: 'Pullovers',
          id: '16ljfdsjfpoit',
          url: '/Pullovers',
          imagePath: 'https://picsum.photos/id/16/55/55',
        },
        {
          name: 'Hoodies',
          id: '17jldsjxmv',
          url: '/Hoodies',
          imagePath: 'https://picsum.photos/id/17/55/55',
        },
        {
          name: 'Pants',
          id: '18mxcnvlsd',
          url: '/Pants',
          imagePath: 'https://picsum.photos/id/18/55/55',
        },
        {
          name: 'Socks',
          id: '19sflskfj',
          url: '/Socks',
          imagePath: 'https://picsum.photos/id/19/55/55',
        },
        {
          name: 'Watches and Bands',
          id: '20lsjflsj',
          url: '/Watches',
          imagePath: 'https://picsum.photos/id/20/55/55',
        },
        {
          name: 'Sweat Shirts',
          id: '21lsjflsj',
          url: '/Sweat',
          imagePath: 'https://picsum.photos/id/21/55/55',
        },
        {
          name: 'Shorts',
          id: '22lsjflsj',
          url: '/Shorts',
          imagePath: 'https://picsum.photos/id/23/55/55',
        },
        {
          name: 'Joggers',
          id: '24lsjflsj',
          url: '/Joggers',
          imagePath: 'https://picsum.photos/id/24/55/55',
        },
        {
          name: 'Zip-up Hoodies',
          id: '25lsjflsj',
          url: '/Zip',
          imagePath: 'https://picsum.photos/id/25/55/55',
        },
        {
          name: 'Sweaters',
          id: '26lsjflsj',
          url: '/Sweaters',
          imagePath: 'https://picsum.photos/id/26/55/55',
        },
        {
          name: 'Denims',
          id: '27lsjflsj',
          url: '/Denims',
          imagePath: 'https://picsum.photos/id/27/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '28lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/28/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '29lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/29/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '30lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/30/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '31lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/31/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '32lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/32/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '33lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/33/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '34lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/34/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '35lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/35/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '36lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/36/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '37lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/37/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '38lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/38/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '39lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/39/55/55',
        },
        {
          name: 'Wallets and Belts',
          id: '40lsjflsj',
          url: '/Wallets',
          imagePath: 'https://picsum.photos/id/40/55/55',
        },
      ],
    },
  },
  play: async ({ canvas, args }) => {
    const linksContainer = await canvas.findByTestId('navbar-subcategories');
    expect(linksContainer).toBeInTheDocument();
    const subcategoryLinks = await canvas.findAllByRole('link');
    expect(subcategoryLinks.length).toBe(args.category?.subcategories?.length);
  },
};

export const NotFound: Story = {
  args: {
    category: {
      id: 'fkjffh2',
      url: '/sale',
      name: 'Sale',
      subcategories: [],
    },
  },
  play: async ({ canvas, args }) => {
    const subcategoryLinks = canvas.queryAllByRole('link');
    expect(subcategoryLinks.length).toBe(args.category?.subcategories?.length);
    const messageElement = await canvas.findByText('Sub-categories not found!');
    expect(messageElement).toBeInTheDocument();
  },
};
