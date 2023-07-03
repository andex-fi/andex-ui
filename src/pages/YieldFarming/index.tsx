import HeaderComponent from "./Header";
import YieldFarmTableComponent from "./YieldFarmTable";
import Page from "../../components/Layout/Page";

export default function YieldFarmingPage(): JSX.Element {
  // const wallet = useWallet()

  return (
    <Page>
      <section className="m-auto p-8 pt-16 h-[65vh]">
      <HeaderComponent />
      <YieldFarmTableComponent />
      <div className="flex flex-col items-center mt-6">
        <button className="bg-[#52058F] text-white px-4 py-2 border rounded-full w-[40%] md:w-[10%]">
          Load more
        </button>
      </div>
    </section>
    </Page>
    
  );
}
