import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { TestSheet } from "./testSheet";

registerSheet("test-sheet", TestSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "test-sheet": SheetDefinition;
  }
}

export {};
