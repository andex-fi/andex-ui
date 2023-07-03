import HeaderComponent from "./Header";
import YieldFarmTableComponent from "./YieldFarmTable";

export default function YieldFarmingPage(): JSX.Element {
  // const wallet = useWallet()

  return (
    <section className="max-w-screen-xl m-auto p-8 pt-16 h-[65vh]">
      <HeaderComponent />
      <YieldFarmTableComponent />
      <div className="flex flex-col items-center mt-6">
        <button className="bg-[#52058F] text-white px-4 py-2 border rounded-full w-[10%]">
          Load more
        </button>
      </div>
    </section>
  );
}
