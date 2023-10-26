const colors = ["#0e4429", "#006d32", "#26a641", "#39d353"];

export const calculateColor = (
  value: number,
  minValue: number,
  maxValue: number,
): string => {
  const ratio = (value - minValue) / (maxValue - minValue);

  // Determine the index in the array based on the ratio
  const index = Math.min(Math.floor(ratio * colors.length), colors.length - 1);

  const selectedColor = colors[index];

  return selectedColor;
};
