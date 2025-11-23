import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { TestSheet, TestSheet2 } from "./testSheet";
import { FiltersSheet } from "./filtersSheet";
import { Inquiry } from "./inquiry";

registerSheet("testSheet", TestSheet);
registerSheet("testSheet2", TestSheet2);
registerSheet("filters", FiltersSheet);
registerSheet("inquiry", Inquiry);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    testSheet: SheetDefinition;
    testSheet2: SheetDefinition;
    filters: SheetDefinition;
    inquiry: SheetDefinition;
  }
}

export {};
