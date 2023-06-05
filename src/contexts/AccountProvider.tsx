/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  // useContext,
  useEffect,
  useState,
} from "react";
import { initVenomConnect } from "../helpers/accountConnection";
import {
  ContractState,
  FullContractState,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import { Account } from "../state/WalletService";

interface AccountContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  standalone?: ProviderRpcClient;
  venomProvider?: ProviderRpcClient;
  address?: string;
  balance?: any;
  account?: Account;
  contract?: ContractState | FullContractState;
  version?: string;
}

const initialState = {
  connect: async () => {
    return;
  },
  disconnect: async () => {
    return;
  },
  address: "",
  balance: 0,
};

export const AccountContext = createContext<AccountContextType>(initialState);

const AccountProvider = ({ children }: { children: ReactNode }) => {
  //   const venomConnect = initVenomConnect();
  const [venomConnect, setVenomConnect] = useState<any>();
  const [venomProvider, setVenomProvider] = useState<
    ProviderRpcClient | undefined
  >();
  const [address, setAddress] = useState<string | undefined>();
  const [balance, setBalance] = useState<any>();
  const [standalone, setStandalone] = useState<ProviderRpcClient | undefined>();
  const [account, setAccount] = useState<Account | undefined>();

  const getAccount = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction;
  };

  const getBalance = async (provider: any, _address: string) => {
    try {
      const providerBalance = await provider?.getBalance?.(_address);

      return providerBalance;
    } catch (error) {
      return undefined;
    }
  };

  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAccount(_venomConnect);
  };

  const check = async (_provider: any) => {
    const _account = _provider ? await getAccount(_provider) : undefined;
    const _address = _provider ? _account?.address.toString() : undefined;
    const _balance =
      _provider && _address ? await getBalance(_provider, _address) : undefined;

    setAccount(_account);
    setAddress(_address);
    setBalance(_balance);

    if (_provider && _address)
      setTimeout(() => {
        check(_provider);
      }, 100);
  };

  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await check(provider);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const disconnect = async () => {
    venomProvider?.disconnect();
    setAccount(undefined);
    setAddress(undefined);
  };

  useEffect(() => {
    // connect event handler
    const off = venomConnect?.on("connect", onConnect);
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [venomConnect]);

  useEffect(() => {
    const initiate = async () => {
      const initedVenomConnect = await initVenomConnect();
      setVenomConnect(initedVenomConnect);

      await checkAuth(initedVenomConnect);
    };
    initiate();
  }, []);

  useEffect(() => {
    const getstandalone = async () => {
      const standalone: ProviderRpcClient | undefined =
        await venomConnect?.getStandalone("venomwallet");
      setStandalone(standalone);
    };
    getstandalone();
  }, [venomConnect]);

  //   useEffect(() => {
  //     checkAuth(venomConnect);
  //     onProviderReady(venomConnect);
  //   }, []);

  const connect = async () => {
    try {
      await venomConnect.connect();
      const _account = await getAccount(venomConnect);
      const address = _account?.address.toString();
      setAccount(_account);
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccountContext.Provider
      value={{
        account,
        venomProvider,
        standalone,
        connect,
        address,
        disconnect,
        balance,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
