module.exports = function (req, res, next){
    if(!req.session.authUser ||req.session.authUser.role_id != 2){
        return res.render('notYourRole', {message:"bạn phải là Admin để có thể truy cập trang này"});
    }
    next();
}