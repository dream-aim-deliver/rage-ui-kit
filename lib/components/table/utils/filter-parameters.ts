import { ITextFilterParams } from "ag-grid-community";

export const DefaultTextFilterParams: ITextFilterParams = {
  filterOptions: ["contains"],
  buttons: ["reset"],
  maxNumConditions: 1,
};

/**
 * Compares a date filter against a cell value excluding time.
 * @param filterLocalDateAtMidnight - The date to filter against, normalized to midnight.
 * @param cellValue - The value from the cell, which can be a date string or a Date object.
 * @returns A number indicating the comparison result:
 *   - 0 if the dates are equal,
 *   - 1 if the cell date is greater than the filter date,
 *   - -1 if the cell date is less than the filter date.
 */
const dateComparator = (
  filterLocalDateAtMidnight: Date,
  cellValue: string | Date,
): number => {
  if (cellValue == null) return -1;

  let cellDate: Date;
  // Convert cell value to a Date object if it's a string, otherwise use it as is.
  if (typeof cellValue === "string") {
    cellDate = new Date(cellValue);
  } else {
    cellDate = cellValue;
  }

  // Normalize both the filter date and cell date to midnight.
  const filterDateOnly = new Date(
    filterLocalDateAtMidnight.setHours(0, 0, 0, 0),
  );
  const cellDateOnly = new Date(cellDate.setHours(0, 0, 0, 0));

  if (filterDateOnly.getTime() === cellDateOnly.getTime()) {
    return 0;
  }

  return cellDateOnly.getTime() > filterDateOnly.getTime() ? 1 : -1;
};

export const DefaultDateFilterParams = {
  maxNumConditions: 1,
  comparator: dateComparator,
  buttons: ["reset"],
};
