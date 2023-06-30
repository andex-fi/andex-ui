import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Button } from "../../../../components/Button";
import { CircleLoader } from "../../../../components/ContentLoader";
import { Item } from "./Item";
import { useBuilderStore } from "../../state/BuilderStore";
import { Table, Th, Box } from "@andex/uikit";

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

export const TokensList: React.FC = () =>{
    const builder = useBuilderStore()

  switch (true) {
    case builder.isLoading:
      return (
        <Box position="absolute" top="12px" right="16px" style={{ zIndex: 17 }}>
          <CircleLoader />
        </Box>
      );

    case builder.tokens.length === 0 && !!builder.filter:
      return (
        <div className="relative overflow-x-auto h-96 bg-white dark:bg-purple-light border border-grey-lightest dark:border-none rounded-t-xl w-full min-h-screen-xl mt-6 md:mt-8 dark:bg-purple">
          <div className="h-500 flex flex-col items-center justify-center w-full">
            <p className="mb-6 mt-36 max-w-644 text-center last:mb-0">
              Token not found
            </p>
            <Button
              btnStyles="mt-0 bg-purple dark:bg-purple-lightest w-auto p-3 text-white rounded-full flex justify-center items-center mx-3 md:w-[30%] md:mx-0 md:ml-4"
              link="/builder/create"
              type="primary"
            >
              Create new one
            </Button>
          </div>
        </div>
      );

    case builder.tokens.length === 0 && !builder.filter:
      return (
        <div className="relative overflow-x-auto h-96 bg-white dark:bg-purple-light border border-grey-lightest dark:border-none rounded-t-xl w-full min-h-screen-xl mt-6 md:mt-8 dark:bg-purple">
          <div className="h-500 flex flex-col items-center justify-center w-full">
            <p className="mb-6 mt-36 max-w-644 text-center last:mb-0">
              You don't have any token
            </p>
            <Button
              btnStyles="mt-0 bg-purple dark:bg-purple-lightest w-auto p-3 text-white rounded-full flex justify-center items-center mx-3 md:w-[30%] md:mx-0 md:ml-4"
              link="/builder/create"
              type="primary"
            >
              Create new one
            </Button>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative overflow-x-auto h-96 bg-white dark:bg-purple-light border border-grey-lightest dark:border-none rounded-t-xl w-full min-h-screen-xl mt-6 md:mt-8 dark:bg-purple">
          <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="border-b border-grey-lightest">
                <Th textAlign="left">Name</Th>
                <Th>Symbol</Th>
                <Th>Decimals</Th>
                <Th>Total Supply</Th>
                <Th>Root</Th>
              </tr>
            </thead>
            <TableBody>
                {builder.tokens.map((token) => (
                    <tr className="font-bold">
                        <Item key={token.root} token={token} />
                    </tr>
                ))}
            </TableBody>
          </Table>
        </div>
      );
  }
}

export const BuilderTokensList = observer(TokensList);
