import { createReducer } from "@reduxjs/toolkit";
import { switcher } from "./switch.actions";

const initialState :boolean=false;
export const switchReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(switcher, (_, {payload}) =>
      payload
    )
);