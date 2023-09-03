module.exports = {
  root: true,
  // This tells ESLint to load the config from the package
  // `eslint-config-anabasis`.
  extends: ["anabasis"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
