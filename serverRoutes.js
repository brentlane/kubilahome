exports.pingme = function(req,res){
    res.send({ok:"hello world"});
};

exports.redirectBrassOps = function(req,res){
    res.redirect('http://www.mylanderpages.com/kubilateam/brassops');
};