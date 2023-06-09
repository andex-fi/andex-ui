import { Token } from "./components/token";
import { PageHeader } from "../../components/PageHeader";

export default function TokenPage(): JSX.Element {
    return (
        <div className="">
            <section className="">
                <PageHeader title="Manage token" />
                <Token />
            </section>
        </div>
    )
}