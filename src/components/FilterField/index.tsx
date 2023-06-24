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
        <div className="md:w-[70%]">
            <div className=''>
                <input
                    className="block p-3 pl-8 text-sm text-gray-900 bg-[#DFE4EE] dark:bg-[#482168] border border-grey-light rounded-3xl w-full bg-gray-50 outline-none font-bold"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    )
}
