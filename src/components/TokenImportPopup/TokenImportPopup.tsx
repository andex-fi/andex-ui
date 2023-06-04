import { Observer } from "mobx-react-lite";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { TokenIcon } from "../TokenIcon";
import { useTokensCache } from "../../state/TokensCacheService";
import ReactDOM from "react-dom";

type Props = {
    onImportConfirm?: (root: string) => void;
}

export function TokenImportPopup({ onImportConfirm }: Props): JSX.Element | null {
    const tokensCache = useTokensCache()

    const onImportConfirmInternal = () => {
        if (tokensCache.currentImportingToken !== undefined) {
            const { root } = tokensCache.currentImportingToken
            tokensCache.onImportConfirm(tokensCache.currentImportingToken)
            onImportConfirm?.(root)
        }
    }

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
                <h2 className="text-20 font-bold leading-24 mb-20">
                    Import Token
                </h2>

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
                            <div>
                                {tokensCache.currentImportingToken?.name}
                            </div>
                        </div>
                    )}
                </Observer>

                <div
                    className="popup-txt"
                    dangerouslySetInnerHTML={{
                        __html: 'This token doesn’t appear on the active token list(s). Make sure this is the token that you want to trade.',
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
        document.body,
    )
}

