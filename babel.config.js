module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/env", {
      useBuiltIns: "usage",
      corejs: 3
    }]
  ];
  const plugins = [
    "lodash",
    ["@babel/transform-runtime", {
      corejs: 3,
    }]
  ];

  // if (process.env["ENV"] === "prod") {
  //   plugins.push(...);
  // }

  return {
    presets,
    plugins
  };
}
