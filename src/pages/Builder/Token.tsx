import { Token } from "./components/token";
import Page from "../Page";

export default function TokenPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center min-h-[90vh] justify-center w-full font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4 py-10 md:py-24">
      <div className="lg:w-[60%] w-full mb-8">
        <h1 className="text-[#13173E] dark:text-white font-bold text-4xl">
          Manage Token
        </h1>
      </div>
      <Token />
    </div>
  );
}
