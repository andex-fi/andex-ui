import * as React from "react";
import { useNavigate } from "react-router-dom";

import { isAddressValid } from "../../../constants";
import { useImportLiquidityFormStoreContext } from "../../../contexts";
import { RemoveLiquidityFormStoreData } from "../../../state/RemoveLiquidityStore";
import { TokenSide } from "../../../components/TokensList";
import { debounce, debug, error } from "@andex/sdk";
// import { appRoutes } from '../../../routes'

type PoolFormShape = {
  isTokenListShown: boolean;
  tokenSide: TokenSide | undefined;
  debouncedSyncPoolShare: () => void;
  hideTokensList: () => void;
  resolveStateFromUrl: (leftRoot?: string, rightRoot?: string) => Promise<void>;
  showTokensList: (side: TokenSide) => () => void;
  onChangeAmount: (value: RemoveLiquidityFormStoreData["amount"]) => void;
  onSelectLeftToken: (root: string) => void;
  onSelectRightToken: (root: string) => void;
  onDismissTransactionReceipt: () => void;
  onLeftImportConfirm: (leftRoot: string, rightRoot?: string) => void;
  onRightImportConfirm: (leftRoot: string, rightRoot: string) => void;
};

export function useImportLiquidityForm(): PoolFormShape {
  const formStore = useImportLiquidityFormStoreContext();
  const navigate = useNavigate();

  const [isTokenListShown, setTokenListVisible] = React.useState(false);

  const [tokenSide, setTokenSide] = React.useState<TokenSide>();

  const debouncedSyncPoolShare = debounce(async () => {
    //
  }, 500);

  const hideTokensList = () => {
    setTokenSide(undefined);
    setTokenListVisible(false);
  };

  const showTokensList = (side: TokenSide) => () => {
    if (formStore.isPreparing || formStore.isSyncingPool) {
      return;
    }

    setTokenSide(side);
    setTokenListVisible(true);
  };

  const resolveStateFromUrl = async (leftRoot?: string, rightRoot?: string) => {
    const isLeftRootValid = isAddressValid(leftRoot);
    const isRightRootValid = isAddressValid(rightRoot);

    if (!isLeftRootValid && !isRightRootValid) {
      return;
    }

    formStore.setData({ leftToken: leftRoot, rightToken: rightRoot });

    if (formStore.tokensCache.isReady) {
      const leftInCache = formStore.tokensCache.has(leftRoot);
      const rightInCache = formStore.tokensCache.has(rightRoot);

      try {
        if (isLeftRootValid && !leftInCache) {
          debug("Try to fetch left token");
          await formStore.tokensCache.addToImportQueue(leftRoot);
        }
      } catch (e) {
        error("Left token import error", e);
        formStore.setData("leftToken", undefined);
      }

      try {
        if (isRightRootValid && !rightInCache) {
          debug("Try to fetch right token");
          await formStore.tokensCache.addToImportQueue(rightRoot);
        }
      } catch (e) {
        error("Right token import error", e);
        formStore.setData("rightToken", undefined);
      }
    }
  };

  const onChangeAmount: PoolFormShape["onChangeAmount"] = async (value) => {
    await formStore.changeAmount(value);
  };

  const onSelectLeftToken: PoolFormShape["onSelectLeftToken"] = (root) => {
    hideTokensList();
    formStore.setData("leftToken", root);
    const rightRoot =
      formStore.rightToken?.root !== undefined &&
      formStore.rightToken.root !== root
        ? formStore.rightToken.root
        : undefined;
    navigate(`/import/${root}/${rightRoot}`, { replace: true });
  };

  const onSelectRightToken: PoolFormShape["onSelectRightToken"] = (root) => {
    hideTokensList();
    formStore.setData("rightToken", root);
    if (formStore.leftToken?.root !== undefined) {
      navigate(`/import/${formStore.leftToken.root}/${root}`, {
        replace: true,
      });
    }
  };

  const onDismissTransactionReceipt = () => {
    //
  };

  const onLeftImportConfirm: PoolFormShape["onLeftImportConfirm"] = async (
    leftRoot: string,
    rightRoot?: string
  ) => {
    await onSelectLeftToken(leftRoot);
    await resolveStateFromUrl(leftRoot, rightRoot);
    hideTokensList();
  };

  const onRightImportConfirm: PoolFormShape["onRightImportConfirm"] = async (
    leftRoot: string,
    rightRoot: string
  ) => {
    await onSelectRightToken(rightRoot);
    await resolveStateFromUrl(leftRoot, rightRoot);
    hideTokensList();
  };

  return {
    debouncedSyncPoolShare,
    hideTokensList,
    isTokenListShown,
    resolveStateFromUrl,
    showTokensList,
    tokenSide,
    // eslint-disable-next-line sort-keys
    onChangeAmount,
    onDismissTransactionReceipt,
    onLeftImportConfirm,
    onRightImportConfirm,
    onSelectLeftToken,
    onSelectRightToken,
  };
}
