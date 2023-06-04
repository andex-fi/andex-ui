import { Avatar } from "../Avatar";


export type TokenIconProps = {
    address?: string;
    className?: string;
    icon?: string;
    name?: string;
    size?: 'small' | 'xsmall' | 'medium' | 'large';
}

export function TokenIcon({
    address,
    className,
    icon,
    name,
    size = 'medium',
}: TokenIconProps): JSX.Element | null {
    if (icon !== undefined) {
        return (
            <img
                alt={name}
                className="h-32 w-32"
                sizes={size}
                src={icon} 
            />
        )
    }

    return address !== undefined ? (
        <Avatar
            address={address}
            size={size}
            className={className}
        />
    ) : null
}

