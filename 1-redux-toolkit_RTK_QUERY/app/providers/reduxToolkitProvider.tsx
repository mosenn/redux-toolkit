"use client";

import { Provider } from "react-redux";

import { ReactNode } from "react";
import { store } from "../store/store";

interface ReduxToolkitProviderProps {
  children: ReactNode;
}

export const ReduxToolkitProvider = ({
  children,
}: ReduxToolkitProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
