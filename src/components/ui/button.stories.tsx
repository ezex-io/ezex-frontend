import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";

const VARIANT_OPTIONS = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "text",
] as const;

const SIZE_OPTIONS = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The `Button` component is a versatile UI element used to trigger actions or navigate users. It supports multiple variants, sizes, and states including loading and disabled.",
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: VARIANT_OPTIONS,
            description:
                "Determines the visual style of the button, such as 'default', 'destructive', or 'ghost'.",
        },
        size: {
            control: { type: "select" },
            options: SIZE_OPTIONS,
            description:
                "Specifies the height and padding of the button, ranging from 'xs' to 'xl'.",
        },
        color: {
            control: { type: "select" },
            options: ["white", "primary"],
            description:
                "Applies an optional color override, typically used with 'ghost' or 'outline' variants.",
        },
        disabled: {
            control: "boolean",
            description:
                "Disables the button, preventing user interaction and reducing visual emphasis.",
        },
        icon: {
            control: "boolean",
            description:
                "Renders the button in an icon-only mode. Useful for toolbars and compact UIs.",
        },
        isLoading: {
            control: "boolean",
            description:
                "Displays a loading state and hides other content. Intended for async actions.",
        },
        iconLeft: {
            control: false,
            description:
                "A React node displayed to the left of the button content.",
        },
        iconRight: {
            control: false,
            description:
                "A React node displayed to the right of the button content.",
        },
        children: {
            control: "text",
            description: "The visible label or content inside the button.",
        },
    },
    args: {
        children: "Click me",
        variant: "default",
        size: "md",
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {VARIANT_OPTIONS.map(variant => (
                <Button key={variant} {...args} variant={variant}>
                    {variant}
                </Button>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Showcases all available button variants. Use these to align with different UX purposes like primary actions, secondary actions, or links.",
            },
        },
    },
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {SIZE_OPTIONS.map(size => (
                <Button key={size} {...args} size={size}>
                    {size}
                </Button>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Displays the button in all available sizes. Useful for designing responsive or context-specific buttons.",
            },
        },
    },
};

export const WithIcons: Story = {
    args: {
        children: "Search",
        iconLeft: <SearchIcon />,
        iconRight: <SearchIcon />,
    },
    parameters: {
        docs: {
            description: {
                story: "Demonstrates buttons with icons on the left and right side. Ideal for actions like 'Download', 'Search', etc.",
            },
        },
    },
};

export const Loading: Story = {
    args: {
        children: "Submitting...",
        isLoading: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Showcases the loading state of a button. Used to indicate an ongoing background action.",
            },
        },
    },
};

export const IconOnly: Story = {
    args: {
        icon: true,
        children: <SearchIcon />,
    },
    parameters: {
        docs: {
            description: {
                story: "Renders an icon-only button. Suitable for compact UIs or toolbars.",
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: "Disabled Button",
    },
    parameters: {
        docs: {
            description: {
                story: "Displays a disabled button state. Helps prevent user actions and provides visual feedback.",
            },
        },
    },
};

export const CombinedVariants: Story = {
    render: args => (
        <div className="flex flex-col gap-10">
            {VARIANT_OPTIONS.map((variant, index) => (
                <div key={variant} className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-foreground text-lg font-semibold">
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}{" "}
                            Variant
                        </h3>

                        <div className="space-y-3">
                            <p className="text-muted-foreground text-sm font-medium">
                                Text + Icon
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {SIZE_OPTIONS.map(size => (
                                    <div
                                        key={`${variant}-${size}`}
                                        className="flex flex-col gap-2"
                                    >
                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            iconLeft={<SearchIcon />}
                                        >
                                            {size}
                                        </Button>
                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            iconLeft={<SearchIcon />}
                                            isLoading
                                        >
                                            {size}
                                        </Button>

                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            iconLeft={<SearchIcon />}
                                            disabled
                                        >
                                            {size}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-muted-foreground text-sm font-medium">
                                Icon Only
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {SIZE_OPTIONS.map(size => (
                                    <div
                                        key={`${variant}-${size}-icon`}
                                        className="flex flex-col gap-2"
                                    >
                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            icon
                                        >
                                            <SearchIcon />
                                        </Button>

                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            icon
                                            isLoading
                                        >
                                            <SearchIcon />
                                        </Button>

                                        <Button
                                            {...args}
                                            size={size}
                                            variant={variant}
                                            icon
                                            disabled
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Horizontal divider between variants */}
                    {index < VARIANT_OPTIONS.length - 1 && (
                        <hr className="border-border mt-6 border-t" />
                    )}
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Organized by variant, this layout uses horizontal dividers to group and separate sections. Each section shows all sizes with both text+icon and icon-only styles.",
            },
        },
    },
};
