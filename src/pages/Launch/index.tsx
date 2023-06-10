import { Observer } from 'mobx-react-lite'

import { Button } from '../../components/Button'
import { PageHeader } from '../../components/PageHeader'
import { Builder } from './components/Builder'
import { FilterField } from './components'
// import { WalletMiddleware } from '@/modules/WalletMiddleware'
import { useWallet } from '../../state/WalletService'


export default function BuilderPage(): JSX.Element {
    const wallet = useWallet()

    return (
        <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark px-4 py-10">
            <section className="box-border p-0 w-full">
                <PageHeader
                    actions={(
                        <Observer>
                            {() => (
                                <div className="flex gap-5 justify-between w-full">
                                    {wallet.isReady && (
                                        <div className='inline-flex gap-6 ml-80'>
                                            <FilterField className="flex-grow inline-flex" />
                                            <Button
                                                btnStyles='inline-flex items-center rounded h-11 px-3 py-2 text-base shadow-sm bg-purple text-white dark:bg-purple-lightest'
                                                link="/builder/create"
                                                size="md"
                                                type="primary"
                                            >
                                                Create new token
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Observer>
                    )}
                    title="Builder"
                />

                {/*<WalletMiddleware>*/}
                    <Builder />
                {/*</WalletMiddleware>*/}
            </section>
        </div>
    )
}
