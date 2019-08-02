import React, { useState } from "react";
import { Intent, Button, NumericInput } from "@blueprintjs/core";
import { toast } from "../../../utils/toaster";
import { useBitmexRest } from "../../../utils/bitmex";
import s from "./CreateSell.module.scss";

type CreateSellType = {
  symbol: string;
};

const CreateSell: React.FunctionComponent<CreateSellType> = (props) => {
  const { symbol } = props;
  const [amount, setAmount] = useState(0);
  const rest = useBitmexRest();
  const isReady = amount !== 0;

  const handleChangeAmount = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      toast.blue({ message: `Sell ${amount} Contracts of ${symbol} at Market.` });
      const response = await rest.createOrder(symbol, "Market", "Sell", amount);
      const { data } = response;
      toast.blue({ message: `${data.orderQty} contracts of ${data.symbol} sold at ${data.price}. The order has fully filled.` });
    } catch (error) {
      toast.red({ message: error.response.data.error.message });
    }
  };

  return (
    <div className={s["create-sell"]}>
      <div className={s["create-sell__fields"]}>
        <NumericInput
          large={true}
          fill={true}
          onValueChange={handleChangeAmount}
          value={amount > 0 ? amount : ""}
          placeholder={"Enter a amount"}
          selectAllOnFocus={true}
          selectAllOnIncrement={true}
          min={0}
        />
      </div>
      <Button
       className={s["create-sell__button"]}
       large={true}
       fill={true}
       text="SELL"
       intent={Intent.DANGER}
       onClick={handleCreate}
       disabled={!isReady}
      />
    </div>
  );
};

export default CreateSell;
