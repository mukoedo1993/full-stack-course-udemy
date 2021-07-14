//goal: export multiple functions that could be executed in multiple javascript files.


exports.login = function(){

}


exports.logout = function(){
    
}

exports.register = function(req , res){
    res.send("Thanks for trying to register.")
}


exports.home = function(req, res){
    res.render('home-guest')
} 