import { Button } from '../../components/Button'
import { Builder } from './components/Builder'
import { FilterField } from './components'
import Page from '../Page'


export default function BuilderPage(): JSX.Element {

    return (
        <Page>
            <div className="max-w-screen-xl m-auto p-8 h-[85vh] md:p-16">
                <div className="items-center w-full md:flex md:justify-between md:w-auto">
                    <div className="w-full md:w-[30%]">
                        <h1 className="text-4xl text-[#13173E] dark:text-white font-bold">Builder</h1>
                    </div>

                    <div className="w-full mt-4 flex items-center md:mt-0 md:w-[70%]">
                        <FilterField className='' />
                        <Button
                            btnStyles='bg-purple dark:bg-purple-lightest w-auto p-3 text-white rounded-full flex justify-center items-center mx-3 md:w-[30%] md:mx-0 md:ml-4'
                            link="/builder/create"
                            size="md"
                            type="primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >                               
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 6v12m6-6H6"
                                />                                                               
                            </svg>
                            Create new token 
                        </Button>
                    </div>
                </div>
                    {/*<WalletMiddleware>*/}
                        <Builder />
                    {/*</WalletMiddleware>*/}
            </div>
        </Page>
    )
}
