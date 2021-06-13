/**
 * Create a text progress bar
 * @param {Number} value - The value to fill the bar
 * @param {Number} maxValue - The max value of the bar
 * @param {Number} size - The bar size (in letters)
 * @return {{Bar: string, percentageText: string}} - The bar
 */
 module.exports = (value, maxValue, size) => {
    const percentage = value / maxValue; 
    const progress = Math.round(size * percentage); 
    const emptyProgress = size - progress; 
  
    const progressText = "▇".repeat(progress); 
    const emptyProgressText = "—".repeat(emptyProgress); 
    const percentageText = Math.round(percentage * 100) + "%"; 
  
    const Bar = progressText + emptyProgressText; 
    return { Bar, percentageText };
  };
  