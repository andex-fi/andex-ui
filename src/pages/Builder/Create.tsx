import { Create } from './components/create'
import Page from '../Page'


export default function CreatePage(): JSX.Element {
    return (
        <Page>
            <div className="container mx-auto sm:h-screen">
                <section className="section">
                    <Create />
                </section>
            </div>
        </Page>
    )
}
