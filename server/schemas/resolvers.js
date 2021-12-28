// import user model
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');




const resolvers = {
    Query: {
  // get a single user by either their id or their username
  async getSingleUser(parent, params, {user}) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      throw new AuthenticationError('Cannot find a user with this id!');
    }

    return foundUser;
  },
},
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
 Mutation: {
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      throw new AuthenticationError("Something is wrong!");
    }
    const token = signToken(user);
    return { token, user };
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      throw new AuthenticationError("Can't find that user!");

    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      throw new AuthenticationError("Wrong password!");
    }
    const token = signToken(user);
    return { token, user };
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
      throw new AuthenticationError(err);
    }
  },
  // remove a book from `savedBooks`
  async deleteBook(parent, params, {user}) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      throw new AuthenticationError("Couldn't find user with this id!");
    }
    return updatedUser;
  },
},

};


module.exports = resolvers;