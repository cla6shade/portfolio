import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GlassButton } from './glass-button';

const meta = {
  title: 'Components/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
    borderWidth: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    brightness: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    blur: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
    displace: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
    backgroundOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    saturation: {
      control: { type: 'range', min: 0, max: 3, step: 0.1 },
    },
    distortionScale: {
      control: { type: 'range', min: -500, max: 500, step: 10 },
    },
    redOffset: {
      control: { type: 'range', min: -50, max: 50, step: 1 },
    },
    greenOffset: {
      control: { type: 'range', min: -50, max: 50, step: 1 },
    },
    blueOffset: {
      control: { type: 'range', min: -50, max: 50, step: 1 },
    },
    xChannel: {
      control: 'select',
      options: ['R', 'G', 'B'],
    },
    yChannel: {
      control: 'select',
      options: ['R', 'G', 'B'],
    },
    mixBlendMode: {
      control: 'select',
      options: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
        'plus-darker',
        'plus-lighter',
      ],
    },
  },
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Glass Button',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    size: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    size: 'default',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '🔍',
    size: 'icon',
  },
};

export const IconSmall: Story = {
  args: {
    children: '🔍',
    size: 'icon-sm',
  },
};

export const IconLarge: Story = {
  args: {
    children: '🔍',
    size: 'icon-lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    size: 'default',
    disabled: true,
  },
};

export const CustomGlassEffect: Story = {
  args: {
    children: 'Custom Glass',
    size: 'default',
    borderRadius: 12,
    blur: 20,
    backgroundOpacity: 0.3,
    saturation: 1.5,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <GlassButton>Default</GlassButton>
        <GlassButton>Destructive</GlassButton>
        <GlassButton>Outline</GlassButton>
        <GlassButton>Secondary</GlassButton>
        <GlassButton>Ghost</GlassButton>
        <GlassButton>Link</GlassButton>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <GlassButton size="sm">Small</GlassButton>
        <GlassButton size="default">Default</GlassButton>
        <GlassButton size="lg">Large</GlassButton>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <GlassButton size="icon-sm">S</GlassButton>
        <GlassButton size="icon">M</GlassButton>
        <GlassButton size="icon-lg">L</GlassButton>
      </div>
    </div>
  ),
};

export const WithColorfulBackground: Story = {
  args: {
    children: 'Glass Button',
    size: 'default',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    size: 'default',
    onClick: () => alert('Glass button clicked!'),
  },
};
