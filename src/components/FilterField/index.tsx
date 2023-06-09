import * as React from 'react'
//import classNames from 'classnames'

type Props = {
    className?: string;
    placeholder?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
    size?: 's'
}

export function FilterField({
    // className,
    placeholder,
    onChange,
    value,
    // size,
}: Props): JSX.Element {
    return (
        <div>
            <input
                className="cursor-pointer block outline-none bg-white dark:bg-purple-light rounded text-gray-800 text-base h-11 px-3 py-2 w-full"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
