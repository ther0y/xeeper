import { Frog } from "frog";
import { LinkletWelcomeFrame } from "./frames/linklet-wlecome.js";
import { LinkletGameFrame } from "./frames/linklet-game.js";
import Home from "../../components/home.js";
import { LinkletState } from "../../types.js";

export const LinkletApp = new Frog<{ State: LinkletState }>({
  initialState: {
    board: null,
    userAnswers: [],
    username: null,
    userPhotoUrl: null,
  },
});

LinkletApp.frame("/", (c) => {
  return LinkletWelcomeFrame(c);
}).frame("/game", (c) => {
  return LinkletGameFrame(c);
});
