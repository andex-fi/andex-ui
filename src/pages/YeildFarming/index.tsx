import HeaderComponent from "./Header";
import YeildFarmTableComponent from "./YeildFarmTable";

export default function YeildFarmingPage(): JSX.Element {
  // const wallet = useWallet()

  return (
    <section className="max-w-screen-xl m-auto p-8 pt-16 h-[65vh]">
      <HeaderComponent />
      <YeildFarmTableComponent />
      <div className="flex flex-col items-center mt-6">
        <button className="bg-[#52058F] text-white px-4 py-2 border rounded-full w-[10%]">
          Load more
        </button>
      </div>
    </section>
  );
}
