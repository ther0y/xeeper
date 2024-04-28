import { Button, FrameContext } from "frog";
import { BlankInput } from "hono/types";
import { AppSate } from "../../../index.js";

export const LinkletWelcomeFrame = (
  c: FrameContext<{ State: AppSate }, "/frames/linklet", BlankInput>
) => {
  return c.res({
    action: "/linklet/game",
    image: "/linket-splash.png",
    intents: [<Button value="start-game">Start ↯</Button>],
    browserLocation: "/linklet-game",
  });
};
