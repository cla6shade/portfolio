import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Flex from './Flex';

const meta = {
  title: 'Components/Container/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'col', 'col-reverse'],
      description: 'Flex direction',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justify content',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Align items',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const BoxItem = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '16px 24px',
      background: 'oklch(0.7 0.2 240)',
      color: 'white',
      borderRadius: '8px',
      minWidth: '80px',
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <BoxItem label="Item 1" />
        <BoxItem label="Item 2" />
        <BoxItem label="Item 3" />
      </>
    ),
  },
};

export const DirectionRow: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4',
  },
};

export const DirectionRowReverse: Story = {
  args: {
    direction: 'row-reverse',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4',
  },
};

export const DirectionCol: Story = {
  args: {
    direction: 'col',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4',
  },
};

export const DirectionColReverse: Story = {
  args: {
    direction: 'col-reverse',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4',
  },
};

export const JustifyStart: Story = {
  args: {
    justify: 'start',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const JustifyEnd: Story = {
  args: {
    justify: 'end',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const JustifyCenter: Story = {
  args: {
    justify: 'center',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const JustifyBetween: Story = {
  args: {
    justify: 'between',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const JustifyAround: Story = {
  args: {
    justify: 'around',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const JustifyEvenly: Story = {
  args: {
    justify: 'evenly',
    children: (
      <>
        <BoxItem label="1" />
        <BoxItem label="2" />
        <BoxItem label="3" />
      </>
    ),
    className: 'gap-4 w-[600px] p-4 border border-gray-300',
  },
};

export const AlignStart: Story = {
  args: {
    align: 'start',
    children: (
      <>
        <BoxItem label="Short" />
        <div
          style={{
            padding: '32px 24px',
            background: 'oklch(0.7 0.2 240)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Tall
        </div>
        <BoxItem label="Short" />
      </>
    ),
    className: 'gap-4 h-[200px] p-4 border border-gray-300',
  },
};

export const AlignEnd: Story = {
  args: {
    align: 'end',
    children: (
      <>
        <BoxItem label="Short" />
        <div
          style={{
            padding: '32px 24px',
            background: 'oklch(0.7 0.2 240)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Tall
        </div>
        <BoxItem label="Short" />
      </>
    ),
    className: 'gap-4 h-[200px] p-4 border border-gray-300',
  },
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <BoxItem label="Short" />
        <div
          style={{
            padding: '32px 24px',
            background: 'oklch(0.7 0.2 240)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Tall
        </div>
        <BoxItem label="Short" />
      </>
    ),
    className: 'gap-4 h-[200px] p-4 border border-gray-300',
  },
};

export const AlignBaseline: Story = {
  args: {
    align: 'baseline',
    children: (
      <>
        <div style={{ fontSize: '14px', padding: '8px' }}>Small</div>
        <div style={{ fontSize: '24px', padding: '8px' }}>Medium</div>
        <div style={{ fontSize: '36px', padding: '8px' }}>Large</div>
      </>
    ),
    className: 'gap-4 p-4 border border-gray-300',
  },
};

export const AlignStretch: Story = {
  args: {
    align: 'stretch',
    children: (
      <>
        <div
          style={{
            padding: '16px',
            background: 'oklch(0.7 0.2 240)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Stretched
        </div>
        <div
          style={{
            padding: '16px',
            background: 'oklch(0.7 0.2 120)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Stretched
        </div>
        <div
          style={{
            padding: '16px',
            background: 'oklch(0.7 0.2 0)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Stretched
        </div>
      </>
    ),
    className: 'gap-4 h-[200px] p-4 border border-gray-300',
  },
};

export const CenteredLayout: Story = {
  args: {
    direction: 'col',
    justify: 'center',
    align: 'center',
    children: (
      <>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>Centered Content</h2>
        <p style={{ margin: '8px 0', color: 'oklch(0.5 0 0)' }}>
          This content is perfectly centered
        </p>
        <BoxItem label="Action Button" />
      </>
    ),
    className: 'gap-4 w-[600px] h-[300px] p-4 border border-gray-300',
  },
};

export const HeaderLayout: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    align: 'center',
    children: (
      <>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Logo</div>
        <Flex direction="row" align="center" className="gap-4">
          <BoxItem label="Home" />
          <BoxItem label="About" />
          <BoxItem label="Contact" />
        </Flex>
      </>
    ),
    className: 'w-[800px] p-4 border border-gray-300',
  },
};
export const NestedFlex: Story = {
  args: {
    direction: 'col',
    className: 'gap-4 w-[600px] p-6 border border-gray-300',
    children: (
      <>
        <Flex justify="between" align="center" className="pb-4 border-b border-gray-300">
          <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Dashboard</h2>
          <BoxItem label="Settings" />
        </Flex>
        <Flex className="gap-4">
          <Flex direction="col" className="gap-2 flex-1 p-4 border border-gray-300 rounded-lg">
            <div style={{ fontWeight: 'bold' }}>Column 1</div>
            <BoxItem label="Item 1" />
            <BoxItem label="Item 2" />
          </Flex>
          <Flex direction="col" className="gap-2 flex-1 p-4 border border-gray-300 rounded-lg">
            <div style={{ fontWeight: 'bold' }}>Column 2</div>
            <BoxItem label="Item 3" />
            <BoxItem label="Item 4" />
          </Flex>
        </Flex>
        <Flex justify="end" className="gap-2 pt-4 border-t border-gray-300">
          <BoxItem label="Cancel" />
          <BoxItem label="Submit" />
        </Flex>
      </>
    ),
  },
};
