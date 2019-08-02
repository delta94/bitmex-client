import React from "react";
import { config } from "../../constants";
import { useBitmexRest } from "../../utils/bitmex";
import { renderSymbol, filterSymbol } from "../../utils/symbol_renderer";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import s from "./Sidebar.module.scss";

type SidebarType = {
  symbol: string;
  setSymbolCallback: (newSymbol: string) => void;
};

const Sidebar: React.StatelessComponent<SidebarType> = (props) => {
  const { symbol, setSymbolCallback } = props;
  const symbols = config.bitmex.symbols.toString().split(",");
  const handleItemSelect = (newSymbol: string) => setSymbolCallback(newSymbol);

  return (
    <div className={s["sidebar"]}>
      <div className={s["sidebar__header"]}>
        <h2 className={s["sidebar__header-title"]}>Bitmex Client</h2>
        <h2 className={s["sidebar__header-subtitle"]}>v0.0.1</h2>
      </div>

      <div className={s["sidebar__content"]}>
        <div className={s["sidebar__content-label"]}>Select symbol:</div>
        <Select
           itemPredicate={filterSymbol}
           itemRenderer={renderSymbol}
           items={symbols}
           filterable={false}
           onItemSelect={handleItemSelect}
           activeItem={symbol}
           noResults={<MenuItem disabled={true} text={"No currencies."} />}
          >
           <Button text={symbol} rightIcon={"caret-down"} />
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
