import { Button, FrameContext } from "frog";
import { BlankInput } from "hono/types";
import { LinkletState } from "../../../types.js";

export const LinkletWelcomeFrame = (
  c: FrameContext<{ State: LinkletState }, "/frames/linklet", BlankInput>
) => {
  return c.res({
    action: "/game",
    image: "/linket-splash.png",
    intents: [<Button value="start-game">Start ↯</Button>],
    browserLocation: "/linklet-game",
  });
};
