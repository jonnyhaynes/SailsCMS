/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': {
    view: 'pages/index'
  },

  // Users
  '/user/new': {
    controller: 'UserController',
    action: 'new',
  },

  '/user/show/:id': {
    controller: 'UserController',
    action: 'show',
  },

  // Admin
  '/admin': {
    controller: 'AdminController',
    action: 'index',
    locals: {
      layout: 'layouts/admin'
    }
  },

  '/admin/user/new': {
    controller: 'AdminController',
    action: 'new',
    locals: {
      layout: 'layouts/admin'
    }
  },

  'post /admin/user/create': 'UserController.create',

  '/admin/user/show/:id': {
    controller: 'UserController',
    action: 'show',
    locals: {
      layout: 'layouts/admin'
    }
  },

  '/admin/user/index': {
    controller: 'UserController',
    action: 'index',
    locals: {
      layout: 'layouts/admin'
    }
  },

  '/admin/user/index/:type': {
    controller: 'UserController',
    action: 'index',
    locals: {
      layout: 'layouts/admin'
    }
  },

  '/admin/user/index/admin': {
    controller: 'UserController',
    action: 'index',
    locals: {
      layout: 'layouts/admin'
    }
  },

  // Login
  'get /login': {
    view: 'session/create'
  },

  'post /login': 'AuthController.login',

  // Logout
  '/logout': 'AuthController.logout',

};
