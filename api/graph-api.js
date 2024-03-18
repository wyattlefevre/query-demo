const { ApolloServer, gql } = require("apollo-server");
const { Sequelize, DataTypes } = require("sequelize");

// Set up the database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  define: {
    timestamps: false,
  },
});

const Post = sequelize.define("Post", {
  title: DataTypes.STRING,
});

const Comment = sequelize.define("Comment", {
  comment: DataTypes.STRING,
});

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

// Sync the models with the database
sequelize.sync();

// Define GraphQL schema
const typeDefs = gql`
  type Query {
    post(id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    addComment(postId: ID!, comment: String!): Comment
    updateComment(commentId: ID!, updatedComment: String!): Comment
  }

  type Post {
    id: ID!
    title: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    comment: String
    post: Post
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    post: async (_, { id }) => await Post.findByPk(id),
    posts: async () => await Post.findAll(),
  },
  Mutation: {
    addComment: async (_, { postId, comment }) => {
      const newComment = await Comment.create({ postId, comment });
      return newComment;
    },
    updateComment: async (_, { commentId, updatedComment }) => {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }
      comment.comment = updatedComment;
      await comment.save();
      return comment;
    },
  },
  Post: {
    comments: async (post) => await post.getComments(),
  },
  Comment: {
    post: async (comment) => await comment.getPost(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
