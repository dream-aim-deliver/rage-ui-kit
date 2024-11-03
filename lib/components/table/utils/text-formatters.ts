const DEFAULT_VALUE = "NaN";

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return DEFAULT_VALUE;
  }
  // TODO: use locale from some context
  return date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
