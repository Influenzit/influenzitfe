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
          NODE_ENV: 'production',
          watch: true,
          watch_delay: 3000,
          ignore_watch: [
            "./node_modules",
            "./app/views",
            "./public",
            "./.DS_Store",
            "./package.json",
            "./yarn.lock",
            "./samples"
          ],
        }
      }
    ]
  };