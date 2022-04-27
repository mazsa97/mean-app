/**
 * Post controller file.
 */

// Import Post model.
const Post = require("../models/post");

// Post creation controller.
exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        // OK status code
        message: "Post added successfully!", // Success message
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update post.",
      });
    });
};

// Post update controller.
exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then((result) => {
    if (result.matchedCount > 0) {
      console.log(result);
      res.status(200).json({ message: "Update succesful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
};

// Posts getter controller.
exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize; // "+" prefix needed so its recognized as a number and not as a string!
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery // Get posts with mongoose
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then((count) => {
      return res.status(200).json({
        // Status coode 200 for succesfull fetching, "return" is not necessary here, because its the last method in this block
        message: "Posts fetched succesfully!", // Add message for completing post fetching
        posts: fetchedPosts, // Set and return posts, documents is a custom name
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed.",
      });
    });
};

// Post getter controller.
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed.",
      });
    });
};

// Post deletion controller.
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }) // Delete post with specific id, mongodb id is named _id!
    .then((result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Delete succesful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting post failed.",
      });
    });
};
