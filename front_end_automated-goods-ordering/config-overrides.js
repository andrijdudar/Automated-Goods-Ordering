const rewireCssMinimizer = require('react-app-rewire-css-minimizer');

module.exports = function override(config, env) {
  // Вимкнення мінімізації CSS
  config.optimization.minimizer = config.optimization.minimizer.filter(
    (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
  );
  return config;
};
