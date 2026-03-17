import { Meta, StoryObj } from '@storybook/nextjs-vite';
import VerticalScrollContainer from '@/components/custom-ui/VerticalScrollContainer';

const meta = {
  title: 'components/custom-ui/VerticalScrollContainer',
  component: VerticalScrollContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    containerClassName: { control: 'text' },
    contentClassName: { control: 'text' },
    scrollbarClassName: { control: 'text' },
    thumbClassName: { control: 'text' },
    scrollToElementId: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, height: 300, border: '1px solid #ccc' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VerticalScrollContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque deleniti vel voluptatibus enim fugit eum minus, ipsam sequi sed similique fuga dolore doloribus aperiam quam veniam. Optio animi numquam explicabo.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque deleniti vel voluptatibus enim fugit eum minus, ipsam sequi sed similique fuga dolore doloribus aperiam quam veniam. Optio animi numquam explicabo.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque deleniti vel voluptatibus enim fugit eum minus, ipsam sequi sed similique fuga dolore doloribus aperiam quam veniam. Optio animi numquam explicabo.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque deleniti vel voluptatibus enim fugit eum minus, ipsam sequi sed similique fuga dolore doloribus aperiam quam veniam. Optio animi numquam explicabo.1',
    containerClassName: '',
    contentClassName: 'pr-2',
    scrollbarClassName: '',
    thumbClassName: '',
    scrollToElementId: '',
  },
};
