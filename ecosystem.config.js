module.exports = {
    apps: [
      {
        name: 'influenzitfe',
        port: 3000,
        script: 'npm run start',
        args: 'start',
        cwd: './',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };