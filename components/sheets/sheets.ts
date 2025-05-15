import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { TestSheet, TestSheet2 } from "./testSheet";
import { Filters } from "./Filters";

registerSheet("testSheet", TestSheet);
registerSheet("testSheet2", TestSheet2);
registerSheet("filters", Filters);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    testSheet: SheetDefinition;
    testSheet2: SheetDefinition;
    filters: SheetDefinition;
  }
}

export {};
