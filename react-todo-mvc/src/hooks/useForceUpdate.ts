import { useReducer } from "react";

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 1);
  return forceUpdate
};

export default useForceUpdate;
