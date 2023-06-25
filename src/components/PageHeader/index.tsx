import * as React from 'react'
import classNames from 'classnames'

import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb'

type Props = {
    actions?: React.ReactNode | React.ReactNode[];
    breadcrumb?: BreadcrumbItem[];
    className?: string;
    subtitle?: React.ReactNode;
    title: React.ReactNode;
}

export function PageHeader(props: Props): JSX.Element {
    const { actions, breadcrumb, className, subtitle, title } = props

    return (
        <header className={classNames('mb-6', className)}>
            {breadcrumb !== undefined && breadcrumb.length > 0 && (
                <Breadcrumb items={breadcrumb} />
            )}
            <div className="items-center w-full md:flex md:justify-between md:w-auto">
                <div className="w-full md:w-[30%]">
                    <h1 className="text-4xl font-black">{title}</h1>
                    {subtitle && (
                        <div className="text-xl font-black">{subtitle}</div>
                    )}
                </div>
                {actions !== undefined && (
                    <div className="w-full mt-4 flex items-center md:mt-0 md:w-[70%]">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    )
}
