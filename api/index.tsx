import { Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import { LinkletApp } from "../src/frames/linklet/index.js";
import { init, onchainData } from "@airstack/frames";
import Home from "../src/components/home.js";
import { AppSate } from "../src/types.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

init(process.env.AIRSTACK_API_KEY!);

export const app = new Frog<{ State: AppSate }>({
  assetsPath: "/",
  basePath: "/",

  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  initialState: {
    count: 0,
  },
});

const onchainDataMiddleware = onchainData({
  env: "dev",
  features: {
    userDetails: {},
  },
});

app.use("/", onchainDataMiddleware);

app
  .get("/", (c) => {
    return c.render(<Home />);
  })
  .get("/linklet-game", (c) => {
    return c.render(<Home />);
  });

app.route("/linklet", LinkletApp);

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
