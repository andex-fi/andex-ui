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
            <div className="inline-flex gap-96 mb-4 ml-64">
                <div className="flex items-center gap-3 flex-row">
                    <h1 className="flex items-center text-2xl font-bold gap-3 leading-8">{title}</h1>
                    {subtitle && (
                        <div className="text-white text-base font-normal tracking-tighter leading-5">{subtitle}</div>
                    )}
                </div>
                {actions !== undefined && (
                    <div className="flex items-center gap-5 justify-between min-w-min w-full">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    )
}
