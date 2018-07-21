class PageController{
  
  login(req,res){
    res.render("login");
  }

  home(req,res){
   
    res.render("index");
    
  }

  dash(req,res){
   
    res.render("dash");
    
  }

}

module.exports = new PageController();