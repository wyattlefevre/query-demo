const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { Sequelize, DataTypes } = require("sequelize");

// Set up the database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Post = sequelize.define(
  "Post",
  {
    title: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
);

const Comment = sequelize.define(
  "Comment",
  {
    comment: DataTypes.STRING,
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

// Sync the models with the database
sequelize.sync();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    post(id: ID): Post
    posts: [Post]
    comment(id: ID): Comment
    comments: [Comment]
  }

  type Post {
    id: ID
    title: String
    comments: [Comment]
  }

  type Comment {
    id: ID
    comment: String
    post: Post
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  posts: async () => await Post.findAll(),
  comments: async () => await Comment.findAll(),
  post: async ({ id }) => await Post.findByPk(id),
  comment: async ({ id }) => await Comment.findByPk(id),
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
const port = 4000;
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
