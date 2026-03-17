import { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarSubcategory from '@/components/layout/Navbar/Desktop/NavbarSubcategory';
import { expect } from 'storybook/test';

const meta = {
  title: 'components/layout/Navbar/Desktop/NavbarSubcategory',
  component: NavbarSubcategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavbarSubcategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subCategory: {
      name: 'Shirt',
      id: '1jljlk',
      url: '/Shirt',
      imagePath: 'https://picsum.photos/id/1/55/55',
    },
  },
  play: async ({ canvas, args }) => {
    const label = canvas.getByText(args.subCategory.name);
    await expect(label).toBeInTheDocument();
    const skeleton = await canvas.findByTestId('skeleton');
    await expect(skeleton).toBeInTheDocument();
    const image = canvas.getByAltText(args.subCategory.name);
    await expect(image).toBeInTheDocument();
  },
};
