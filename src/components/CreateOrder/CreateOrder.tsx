import * as React from "react";
import s from "./CreateOrder.module.scss";
import { CreateBuy } from "./CreateBuy";
import { CreateSell } from "./CreateSell";

type CreateOrderType = {
  symbol: string;
};

const CreateOrder: React.FunctionComponent<CreateOrderType> = (props) => {
  const { symbol } = props;

  return (
    <div className={s["create-order"]}>
      <h1 className={s["create-order__title"]}>Create order</h1>
      <div className={s["create-order__container"]}>
        <div className={s["create-order__container-buy"]}>
          <CreateBuy
            symbol={symbol}
          />
        </div>
        <div className={s["create-order__container-sell"]}>
          <CreateSell
            symbol={symbol}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
