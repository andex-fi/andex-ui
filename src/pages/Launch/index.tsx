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
        <div className="container container--large">
            <section className="section">
                <PageHeader
                    actions={(
                        <Observer>
                            {() => (
                                <div className="section__header-actions">
                                    {wallet.isReady && (
                                        <>
                                            <FilterField className="filter" />
                                            <Button
                                                btnStyles=''
                                                link="/builder/create"
                                                size="md"
                                                type="primary"
                                            >
                                                Create new token
                                            </Button>
                                        </>
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
