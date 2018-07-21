let PageController = require("../controllers/PageController.js");

module.exports = (app)=>{

  // PAGE RENDER routes

  app.get("/",PageController.home);
  app.get("/login",PageController.login);
  app.get("/dash",PageController.dash);

  // CATCHALL ROUTES

  app.get("/*",PageController.home);

}