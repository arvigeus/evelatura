import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

const avatarVariants = tv({
	base: [
		"relative flex shrink-0 overflow-hidden rounded-full",
		"flex items-center justify-center border border-secondary/20 bg-muted",
	],
	variants: {
		size: {
			sm: "h-8 w-8 text-xs",
			md: "h-10 w-10 text-sm",
			lg: "h-12 w-12 text-base",
			xl: "h-16 w-16 text-lg",
			"2xl": "h-20 w-20 text-xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const imageVariants = tv({
	base: "aspect-square h-full w-full object-cover",
});

const fallbackVariants = tv({
	base: "flex h-full w-full items-center justify-center bg-secondary/10 font-medium text-primary",
});

interface AvatarProps {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: "sm" | "md" | "lg" | "xl" | "2xl";
	className?: string;
	animate?: boolean;
}

export function Avatar({
	src,
	alt,
	fallback,
	size,
	className,
	animate = false,
	...props
}: AvatarProps) {
	if (animate) {
		return (
			<div className={avatarVariants({ size, className })} {...props}>
				{src ? (
					<img src={src} alt={alt || "Avatar"} className={imageVariants()} />
				) : (
					<span className={fallbackVariants()}>{fallback || "?"}</span>
				)}
			</div>
		);
	}

	return (
		<div className={avatarVariants({ size, className })} {...props}>
			{src ? (
				<img src={src} alt={alt || "Avatar"} className={imageVariants()} />
			) : (
				<span className={fallbackVariants()}>{fallback || "?"}</span>
			)}
		</div>
	);
}

interface AvatarGroupProps {
	children: ReactNode;
	max?: number;
	className?: string;
}

export function AvatarGroup({
	children,
	max = 3,
	className,
}: AvatarGroupProps) {
	if (typeof children === "string") {
		return (
			<div className={`-space-x-2 flex ${className || ""}`}>{children}</div>
		);
	}

	const childrenArray = Array.isArray(children) ? children : [children];
	const visibleChildren = childrenArray.slice(0, max);
	const remainingCount = childrenArray.length - max;

	return (
		<div className={`-space-x-2 flex ${className || ""}`}>
			{visibleChildren.map((child, index: number) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: Avatar group display order
					key={`avatar-${index}`}
					className="rounded-full ring-2 ring-surface"
				>
					{child as ReactNode}
				</div>
			))}
			{remainingCount > 0 && (
				<Avatar
					fallback={`+${remainingCount}`}
					className="bg-accent/10 text-accent ring-2 ring-surface"
				/>
			)}
		</div>
	);
}
