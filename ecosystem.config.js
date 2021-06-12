module.exports = {
    apps : [{
      name: "Shiko~",
      script: "shiko-main.js",
      instances: 1,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }]
  };