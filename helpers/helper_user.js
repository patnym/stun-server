

var userHelper = class UserHelper {
    
    removeSensitiveUserData(user, admin) {
        user.password = undefined;
        user._id = admin ? user._id : undefined;
        user.__v = admin ? user.__v : undefined;
        return user;
    }

    removeMultipleSensitiveUserData(users, admin) {
        users.forEach((element) => {
            this.removeSensitiveUserData(element, admin);
        }, this);
        return users;
    }

}

module.exports = new userHelper;