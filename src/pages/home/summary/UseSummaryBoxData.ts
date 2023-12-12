import { StreamData, usePricingData } from "../UsePricingData";
import { useEffect, useState } from "react";
import { RawMessage } from "../../../models/RawMessage";
import { defaultPositionData, PositionData } from "./PositionData";
import { defaultPnlData, PnlData } from "./PnlData";

function UseSummaryBoxData() {
  const { getPricingData } = usePricingData();
  const [position, setPosition] = useState<PositionData>(defaultPositionData);
  const [pnl, setPnl] = useState<PnlData>(defaultPnlData);

  useEffect(() => {
    const subscription = getPricingData(
      false,
      processSnapshot,
      processLiveData
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [getPricingData]);

  function processSnapshot(messages: Array<RawMessage>) {
    calcData(messages);
  }

  function processLiveData({ full }: StreamData) {
    calcData(full);
  }

  function calcData(messages: Array<RawMessage>) {
    const position = calcPosition(messages);
    setPosition(position);

    const pnl = calcPnl(messages);
    setPnl(pnl);
  }

  function calcPosition(messages: Array<RawMessage>): PositionData {
    return messages.reduce((previousValue, currentValue) => {
      const { netFullOpenSettlePosition } = currentValue;
      const positionValue = netFullOpenSettlePosition ?? 0;

      return {
        total: previousValue.total + positionValue,
        long: previousValue.long + (positionValue > 0 ? positionValue : 0),
        short: previousValue.short + (positionValue < 0 ? positionValue : 0),
      } as PositionData;
    }, defaultPositionData);
  }

  function calcPnl(messages: Array<RawMessage>): PnlData {
    return messages.reduce((previousValue, currentValue) => {
      const { realizedProfitAndLoss, unrealizedProfitAndLossFromFeeds } =
        currentValue;
      const realizedPnLValue = realizedProfitAndLoss ?? 0;
      const unrealizedPnLValue = unrealizedProfitAndLossFromFeeds ?? 0;

      return {
        total: previousValue.total + realizedPnLValue + unrealizedPnLValue,
        real: previousValue.real + realizedPnLValue,
        unreal: previousValue.unreal + unrealizedPnLValue,
      } as PnlData;
    }, defaultPnlData);
  }

  return { position, pnl };
}

export default UseSummaryBoxData;
