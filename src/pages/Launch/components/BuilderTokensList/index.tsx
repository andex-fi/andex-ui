import { observer } from "mobx-react-lite";

import { Button } from "../../../../components/Button";
import { ContentLoader } from "../../../../components/ContentLoader";
import { Item } from "./Item";
import { useBuilderStore } from "../../state/BuilderStore";

export function TokensList(): JSX.Element {
  const builder = useBuilderStore();

  switch (true) {
    case builder.isLoading:
      return <ContentLoader />;

    case builder.tokens.length === 0 && !!builder.filter:
      return (
        <div className="message">
          <p className="message__text">Token not found</p>
          <Button btnStyles="" link="/builder/create" type="primary">
            Create new one
          </Button>
        </div>
      );

    // case builder.tokens.length === 0 && !builder.filter:
    //     return (
    //         <div className="message">
    //             <p className="message__text">
    //                 You don't have any token
    //             </p>
    //             <Button btnStyles="" link="/builder/create" type="primary">
    //                 Create new one
    //             </Button>
    //         </div>
    //     )

    default:
      return (
        // <div className="tokens-list list">
        <div className="border-2 border-purple">
          <div className="pb-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Filtering..."
              />
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="list__header text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="list__cell list__cell--left px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="list__cell list__cell--center px-6 py-3">
                    Symbol
                  </th>
                  <th scope="col" className="list__cell list__cell--center px-6 py-3">
                    Decimals
                  </th>
                  <th scope="col" className="list__cell list__cell--center px-6 py-3">
                    Total Supply
                  </th>
                  <th scope="col" className="list__cell list__cell--center px-6 py-3">
                    Root
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Everbeans
                  </th>
                  <td className="px-6 py-4">EVB</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">Oxfecs...654ad</td>
                </tr>
              </tbody>
            </table>
          </div>

          {builder.tokens.map((token) => (
            <Item key={token.root} token={token} />
          ))}
        </div>
      );
  }
}

export const BuilderTokensList = observer(TokensList);
