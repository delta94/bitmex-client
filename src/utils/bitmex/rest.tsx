import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { config } from "../../constants";

type CreateOrderType = (
  symbol: string,
  type: string,
  side: string,
  amount: number,
  price?: number,
) => Promise<AxiosResponse<any>>;

type GetInstrumentsType = () => Promise<AxiosResponse<any>>;

type BitmexRestProviderType = {
  children: React.ReactNode;
};

type BitmexRestContextType = {
  createOrder: CreateOrderType;
  getMarkets: GetInstrumentsType;
};

const BitmexRestContext: React.Context<BitmexRestContextType | any> = React.createContext({});

export const BitmexRestProvider: React.FunctionComponent<BitmexRestProviderType> = ({ children }) => {
  const http = axios.create({
    baseURL: `${config.proxy.host}:${config.proxy.port}${config.bitmex.basePath}`,
    headers: {
      "content-type": "application/json",
      "Accept": "application/json",
      "bitmex-api-testnet": config.bitmex.testnet,
      "bitmex-api-key": config.bitmex.key,
      "bitmex-api-secret": config.bitmex.secret,
    },
  });

  const createOrder = async (symbol: string, type: string, side: string, amount: number, price: number) => {
    return await http.post("/order", {
      symbol: symbol,
      side: side,
      ordType: type,
      price: price,
      orderQty: amount,
    });
  };

  const getInstruments = async () => {
    return await http.get("/instrument/activeAndIndices");
  };

  return (
    <BitmexRestContext.Provider value={{
      createOrder: createOrder,
      getInstruments: getInstruments,
    }}>
      {children}
    </BitmexRestContext.Provider>
  );
};

export const useBitmexRest = () => (React.useContext(BitmexRestContext));
