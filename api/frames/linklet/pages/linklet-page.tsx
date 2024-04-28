import { Frog } from "frog";
import { AppSate } from "../../../index.js";
import Home from "../../../../src/components/home.js";

const CreateLinketPage = (
  app: Frog<
    {
      State: AppSate;
    },
    {},
    "/",
    AppSate
  >
) => {
  app.get("/linklet-game", (c) => {
    return c.render(<Home />);
  });
};

export default CreateLinketPage;
