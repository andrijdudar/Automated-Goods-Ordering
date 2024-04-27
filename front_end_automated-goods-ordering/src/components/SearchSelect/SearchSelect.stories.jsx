import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SearchSelect} from './SearchSelect';

const meta: Meta<typeof SearchSelect> = {
  component: SearchSelect,
};

export default meta;

type Story = StoryObj<typeof SearchSelect>;

export const Basic: Story = {args: {}};
