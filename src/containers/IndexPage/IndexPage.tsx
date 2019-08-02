import React, { useState } from "react";
import { config } from "../../constants";
import { Helmet } from "react-helmet";
import { CreateOrder } from "../../components/CreateOrder";
import { Sidebar } from "../../components/Sidebar";
import { Layout } from "../../components/Layout";
import s from "./IndexPage.module.scss";

const IndexPage: React.FunctionComponent = () => {
  const symbols = config.bitmex.symbols.split(",");
  const [symbol, setSymbol] = useState(symbols[0]);
  const setSymbolCallback = (newSymbol: string) => setSymbol(newSymbol);

  return (
    <Layout>
      <Helmet>
        <title>Bitmex Client - Index Page</title>
      </Helmet>
      <div className={s["index-page"]}>
        <div className={s["index-page__sidebar"]}>
          <Sidebar
            symbol={symbol}
            setSymbolCallback={setSymbolCallback}
          />
        </div>
        <div className={s["index-page__content"]}>
          <CreateOrder
            symbol={symbol}
          />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
