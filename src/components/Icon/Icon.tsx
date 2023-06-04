/* eslint-disable @typescript-eslint/no-explicit-any */
import library from "./lib";
import { camelify } from "../../utils";

type DefaultLibraryType = typeof library

export interface IconProps<
    T extends DefaultLibraryType | { [key in string]: any }
> extends React.AllHTMLAttributes<HTMLElement> {
    component?: React.ElementType;
    lib?: T;
    icon: keyof T;
    ratio?: number;
}


export function Icon<T extends DefaultLibraryType | { [key in string]: any }>(props: IconProps<T>): JSX.Element | null {
    const {
        component: Component = 'span',
        lib = library,
        icon,
        ratio = 1,
        ...restProps
    } = props

    if (!icon) {
        return null
    }

    const Ico = (lib as T)[camelify(icon as string) as keyof T] as unknown as React.ElementType

    return (
        <Component
            className="bg-transparent border-none rounded-none text-current inline-block fill-current leading-0 m-0 overflow-visible p-0 uppercase"
            {...restProps}
        >
            {Ico && <Ico ratio={ratio} />}
        </Component>
    )
}
