export const getFirstSymbols = (string) => {
  const firstSymbols = [...string]
    .slice(0, 37)
    .join('');

  return `${firstSymbols}...`;
};
