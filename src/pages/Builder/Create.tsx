import { Create } from './components/create'
import Page from '../Page'


const CreatePage: React.FC = () => {
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

export default CreatePage
