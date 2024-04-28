import { Frog } from "frog";
// import { neynar } from 'frog/hubs'
import { LinkletWelcomeFrame } from "./frames/linklet-wlecome.js";
import { LinkletGameFrame } from "./frames/linklet-game.js";
import CreateLinketPage from "./pages/linklet-page.js";
import { AppSate } from "../../index.js";

const registerRoutes = (
  app: Frog<
    {
      State: AppSate;
    },
    {},
    "/",
    AppSate
  >
) => {
  app.frame("/linklet", (c) => {
    return LinkletWelcomeFrame(c);
  });

  app.frame("/linklet/game", (c) => {
    return LinkletGameFrame(c);
  });

  CreateLinketPage(app);
};

export const LinkletFrame = {
  registerRoutes,
};
