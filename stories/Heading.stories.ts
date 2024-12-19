import type { Meta,StoryObj } from '@storybook/react';

import HeadComponent  from '../components/HeadComponent';

const meta: Meta<typeof HeadComponent> = {
    title: 'Head Component',
    component: HeadComponent,
};

export default meta;

type Story = StoryObj<typeof HeadComponent>;
 
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};