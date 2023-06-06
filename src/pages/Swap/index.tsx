import { Observer } from "mobx-react-lite";
import SwapCard from "./SwapCard";
//  import Navbar from "../../components/Navbar";

export default function Swap() {
  return (
    <Observer>
      {() => (
        <section className="h-screen w-full bg-[#EBF1FF] dark:bg-purple-dark">
          <SwapCard />
        </section>
      )}
    </Observer>
  );
}
