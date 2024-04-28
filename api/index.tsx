import { Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import { LinkletFrame } from "./frames/linklet/index.js";
import { init, onchainData } from "@airstack/frames";
import { BoggleBoard } from "../src/utils/boggle-generator.js";
import Home from "../src/components/home.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

init(process.env.AIRSTACK_API_KEY!);

export type AppSate = {
  count: number;
  board: BoggleBoard;
  userAnswers: string[];
  username: string | null;
  userPhotoUrl: string | null;
};

export const app = new Frog<{ State: AppSate }>({
  assetsPath: "/",
  browserLocation: "/",
  basePath: "/api",

  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  initialState: {
    count: 0,
    board: null,
    userAnswers: [],
    username: null,
    userPhotoUrl: null,
  },
});

const onchainDataMiddleware = onchainData({
  env: "dev",
  features: {
    userDetails: {},
  },
});

app.use("/", onchainDataMiddleware);

LinkletFrame.registerRoutes(app);

app.get("/", (c) => {
  return c.render(<Home />);
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
