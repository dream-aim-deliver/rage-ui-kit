export const generateTimestamps = (daysAgo: number): number[] => {
  const now = new Date(); // Current date
  const timestamps: number[] = [];

  for (let i = daysAgo; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    timestamps.push(date.getTime());
  }

  return timestamps;
};
