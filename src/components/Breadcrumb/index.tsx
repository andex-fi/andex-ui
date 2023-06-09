import * as React from 'react'
import { NavLink } from 'react-router-dom'


export type BreadcrumbItem = {
    link?: string
    title: React.ReactNode
}

type Props = {
    items: BreadcrumbItem[]
}

export function Breadcrumb({
    items,
}: Props): JSX.Element {
    return (
        <ul className="text-white opacity-75 flex flex-wrap text-base leading-5 mb-8">
            {items.map(({ link, title }, index) => (
                <li key={index}>
                    {link ? (
                        <NavLink to={link}>{title}</NavLink>
                    ) : (
                        <span>{title}</span>
                    )}
                </li>
            ))}
        </ul>
    )
}
