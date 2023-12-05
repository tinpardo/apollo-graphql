import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import cors from "cors";

import axios from "axios";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    Binance(symbol: String!): [Book_Binance]
    Buda(datos: String): Book_Buda
    Buda_all: Buda_tickers
    Cotizacion(datos: String, cantidad: Float): Quote
  }
  type Buda_tickers{
    tickers: [mercados]
  }
type mercados{
    market_id: String
    last_price: [String]

}

  type Book_Binance {
    id: ID
    symbol: String
    price: String
    qty: Float
    quoteQty: String
    time: Int
    isBuyerMaker: Boolean
    isBestMatch: Boolean
  }

  type Quote{
    quotation: Quotating
  }

  type Quotating {
    amount: [String]
    limit: String
    type: String
    order_amount: [String]
    base_exchanged: [String]
    quote_exchanged: [String]
    base_balance_change: [String]
    quote_balance_change: [String]
    fee: [String]
  }

  type Cantidad {
    precio: String
    moneda: String
  }

  type Book_Buda{
    ticker: ordenes
  }
  type ordenes{
    max_bid: [String]
    min_ask: [String]
    market_id: String
    last_price: [String]

  }
 
  
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    Binance: async (obj, args, context, info) => {
      const options = { "content-type": "application/json" };
      const salida = await axios.get(
        "https://api.binance.com/api/v3/trades?symbol=" +
          args.symbol +
          "&limit=5",
        options
      );
      return salida.data;
    },
    Cotizacion: async (obj, args, context, info) => {
      const salida = await axios.post(
        "https://www.buda.com/api/v2/markets/" + args.datos + "/quotations",
        {
          type: "bid_given_size",
          amount: args.cantidad,
        }
      );
      return salida.data;
    },
    Buda: async (obj, args, context, info) => {
      const salida = await axios.get(
        "https://www.buda.com/api/v2/markets/" + args.datos + "/ticker"
      );
      return salida.data;
    },
    Buda_all: async () => {
      const salida = await axios.get("https://www.buda.com/api/v2/tickers");
      return salida.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
