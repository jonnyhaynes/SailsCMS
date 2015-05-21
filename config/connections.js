module.exports.connections = {
  mongoDev: {
    adapter: 'sails-mongo',
    host: 'localhost', // defaults to `localhost` if omitted
    port: 27017, // defaults to 27017 if omitted
    user: '', // or omit if not relevant
    password: '', // or omit if not relevant
    database: 'sailscms' // or omit if not relevant
  }
};
