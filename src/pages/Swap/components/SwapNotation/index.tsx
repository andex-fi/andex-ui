import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button } from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import TokenIcons from "../../../../components/TokenIcons";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { storage } from "../../../../utils";


function SwapNotationInternal(): JSX.Element | null {
  const formStore = useSwapFormStore();
  const wallet = formStore.useWallet;

  const [available, setAvailable] = React.useState(
    storage.get("swap_notation") == null
  );

  if (wallet.isInitializing || wallet.isUpdatingContract) {
    return null;
  }

  if (
    !wallet.hasProvider ||
    !wallet.isConnected ||
    (wallet.isConnected && wallet.balance === "0")
  ) {
    const connect: React.MouseEventHandler<HTMLAnchorElement> = async (
      event
    ) => {
      event.preventDefault();
      await wallet.connect();
    };
    return (
      <div className="card swap-notation-newbie">
        <div>
          <h3>New to Andex?</h3>
          {!wallet.hasProvider || !wallet.isConnected ? (
            <p>It only takes 2 steps to get the best out of Andex:</p>
          ) : (
            <>
              <p>You successfully installed and connected VENOM Wallet.</p>
              <p>It only takes 1 last step to get the best out of Andex:</p>
            </>
          )}
          <p>
            {!wallet.hasProvider && (
              <a
                className="swap-notation-link"
                href="https://l1.broxus.com/everscale/wallet"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install VENOM Wallet
                <Icon icon="chevronRight" />
              </a>
            )}
            {wallet.hasProvider && !wallet.isConnected && (
              <a
                className="swap-notation-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={connect}
              >
                Connect Wallet
                <Icon icon="chevronRight" />
              </a>
            )}
          </p>
          <p>
            <a
              className="swap-notation-link"
              href="https://docs.flatqube.io/use/getting-started/how-to-get-ever"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Venom
              <Icon icon="chevronRight" />
            </a>
          </p>
        </div>

        <footer>
          <p>Any questions?</p>
          <p>
            <a
              className="swap-notation-link"
              href="https://t.me/FlatQube"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Telegram group
              <Icon icon="chevronRight" />
            </a>
          </p>
        </footer>
      </div>
    );
  }

  if (wallet.isConnected && available) {
    const onDismiss = () => {
      storage.set("swap_notation", "1");
      setAvailable(false);
    };

    return (
      <div className="card swap-notation">
        <div>
          <Button type="icon" className="popup-close" onClick={onDismiss}>
            <Icon icon="close" />
          </Button>
          <div className="swap-notation__icon-holders">
            <TokenIcons
              icons={[
                {
                  icon: "https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WEVER/logo.svg",
                },
                { icon: formStore.coin.icon },
              ]}
              size="medium"
            />
          </div>
          {/* <h3>
                        {intl.formatMessage({ id: 'SWAP_COMBINED_NOTATION_TITLE' })}
                    </h3>
                    <p>
                        {intl.formatMessage({ id: 'SWAP_COMBINED_NOTATION_P1' })}
                    </p>
                    <p>
                        {intl.formatMessage({ id: 'SWAP_COMBINED_NOTATION_P2' })}
                    </p> */}
        </div>
        <footer>
          <p>
            <a
              className="swap-notation-link"
              href="https://docs.flatqube.io/use/swap/how-to/make-a-basic-swap"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to swap
              <Icon icon="chevronRight" />
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return null;
}

export const SwapNotation = observer(SwapNotationInternal);
