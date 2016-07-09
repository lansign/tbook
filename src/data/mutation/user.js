/**
 * Created by lan on 16/5/31.
 */

import {
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID
} from 'graphql';

import UserModel from '../models/UserModel'
import UserType from '../types/UserType';

const user = {
    type: UserType,
    args:{
        userId: {type: StringType},
        email: {type: StringType},
        emailConfirmed: {type: BooleanType},
        displayName: {type: StringType},
        picture: {type: StringType},
        website: {type: StringType},
        location: {type: StringType},
        isAdmin:{type: BooleanType}
    },

    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (!root.request.user._doc._id) {
                reject(new Error("您没有权限!"))
                return;
            }

            UserModel.findById(root.request.user._doc._id, function(err, user) {
                if (err) {
                    reject(err)
                } else if (!user || !user.isAdmin) {
                    reject(new Error("您没有权限!"))
                } else {
                    UserModel.findById(args.userId, function(err, modifyUser){
                        if (err) {
                            reject(err)
                            return;
                        }

                        if (!modifyUser) {
                            reject(new Error("修改的用户不存在!"))
                            return;
                        }

                        if (args.email) {
                            modifyUser.email = args.email;
                            modifyUser.emailConfirmed = args.emailConfirmed;
                        }

                        if (args.displayName) {
                            modifyUser.displayName = args.displayName;
                        }

                        if (args.picture) {
                            modifyUser.picture = args.picture;
                        }

                        if (args.website) {
                            modifyUser.website = args.website;
                        }

                        if (args.location) {
                            modifyUser.location = args.location;
                        }

                        if (args.isAdmin === true || args.isAdmin === false) {
                            modifyUser.isAdmin = args.isAdmin;
                        }

                        modifyUser.save((err) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(modifyUser)
                            }
                        })
                    })
                }
            })
        })
    }
};

export default user