import { UseNavigateResult } from "@tanstack/react-router";

const globalRouter = { navigate: null } as {
  navigate: null | UseNavigateResult<string>;
};

export default globalRouter;