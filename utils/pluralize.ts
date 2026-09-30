export const pluralize = (
  count: number,
  one: string,
  few: string,
  many: string
): string => {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;

  if (mod100 >= 11 && mod100 <= 19) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
};

export const peopleInTrackLabel = (count: number): string => {
  const word = pluralize(count, "человек", "человека", "человек");
  return `${count} ${word}`;
};
