import { Create } from './components/create'


export default function CreatePage(): JSX.Element {
    return (
        <div className="container mx-auto sm:h-screen">
            <section className="section">
                <Create />
            </section>
        </div>
    )
}
