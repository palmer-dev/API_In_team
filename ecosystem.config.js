module.exports = {
  apps: [{
    name: "DBH-IN-TEAM",
    script: "./app.js",
    "watch": true,
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}