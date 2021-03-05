module.exports = function (req, res, next){
    if(!req.session.authUser ||req.session.authUser.role != 4){
        return res.render('notYourRole', {message:"bạn phải là Thủ thư để có thể truy cập trang này"});
    }
    next();
}