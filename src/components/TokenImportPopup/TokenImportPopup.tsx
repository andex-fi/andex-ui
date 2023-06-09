import { Observer } from "mobx-react-lite";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { TokenIcon } from "../TokenIcon";
import { useTokensCache } from "../../state/TokensCacheService";
import ReactDOM from "react-dom";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  onImportConfirm?: (root: string) => void;
  isOpen: boolean;
};

export function TokenImportPopup({
  onImportConfirm,
  isOpen,
}: Props): JSX.Element | null {
  const tokensCache = useTokensCache();

  const onImportConfirmInternal = () => {
    if (tokensCache.currentImportingToken !== undefined) {
      const { root } = tokensCache.currentImportingToken;
      tokensCache.onImportConfirm(tokensCache.currentImportingToken);
      onImportConfirm?.(root);
    }
  };

  return (
    <Dialog open={isOpen} onClose={tokensCache.onImportDismiss}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center z-50 justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-1/3  h-auto py-10 p-10 flex flex-col gap-5 rounded-[24px] bg-white shadow-[0_16px_48px_0_rgba(27, 0, 49, 0.16)]">
          <div className=" flex flex-col gap-3 justify-between ">
            <div className="flex justify-between ">
              <h2 className="text-20 font-bold leading-24">Import Token</h2>
              <Button
                btnStyles="text-black"
                type="icon"
                onClick={tokensCache.onImportDismiss}
              >
                <AiOutlineClose className="text-[20px] font-bold" />
              </Button>
            </div>
            <Observer>
              {() => (
                <div className="flex flex-col items-center justify-center">
                  <div className="">
                    <div className="">
                      <TokenIcon
                        address={tokensCache.currentImportingToken?.root}
                        name={tokensCache.currentImportingToken?.name}
                        icon={tokensCache.currentImportingToken?.icon}
                      />
                    </div>
                  </div>
                  <div>{tokensCache.currentImportingToken?.name}</div>
                </div>
              )}
            </Observer>

            <div
              className="popup-txt"
              dangerouslySetInnerHTML={{
                __html:
                  "This token doesn’t appear on the active token list(s). Make sure this is the token that you want to trade.",
              }}
            />

            <Button
              btnStyles="bg-purple-light text-white dark:bg-purple-lightest dark:text-white m-6 p-4 rounded-xl font-bold"
              block
              size="md"
              type="primary"
              onClick={onImportConfirmInternal}
            >
              Import
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full z-900">
      <div className="fixed" onClick={tokensCache.onImportDismiss} />
      <div className="static left-auto transform-none w-full">
        <Button
          btnStyles="text-white h-40 w-40 opacity-50 absolute right-10 top-12 z-2 hover:opacity-100"
          type="icon"
          onClick={tokensCache.onImportDismiss}
        >
          <Icon icon="close" />
        </Button>
        <h2 className="text-20 font-bold leading-24 mb-20">Import Token</h2>

        <Observer>
          {() => (
            <div className="flex items-center border border-white border-opacity-10 justify-start p-16 border-yellow-500">
              <div className="flex items-center border border-white border-opacity-10 justify-start p-16">
                <div className="bg-white bg-opacity-50 rounded-full flex-shrink-0 h-32 w-32 mr-16 overflow-hidden">
                  <TokenIcon
                    address={tokensCache.currentImportingToken?.root}
                    name={tokensCache.currentImportingToken?.name}
                    icon={tokensCache.currentImportingToken?.icon}
                  />
                </div>
              </div>
              <div>{tokensCache.currentImportingToken?.name}</div>
            </div>
          )}
        </Observer>

        <div
          className="popup-txt"
          dangerouslySetInnerHTML={{
            __html:
              "This token doesn’t appear on the active token list(s). Make sure this is the token that you want to trade.",
          }}
        />

        <Button
          btnStyles=""
          block
          size="md"
          type="primary"
          onClick={onImportConfirmInternal}
        >
          Import
        </Button>
      </div>
    </div>,
    document.body
  );
}
