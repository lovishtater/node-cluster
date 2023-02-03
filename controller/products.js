const Products = require("../model/product");

exports.getProducts = (req, res) => {
  Products.find()
    .then((products) => {
      res.status(200).json({
        message: "success",
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching failed successfully",
        error: err,
      });
    });
};

exports.createProduct = (req, res) => {
  console.log("req.body", req.body);
  const product = new Products(req.body);
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json({
        message: "Product added",
        product: createdProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating failed",
        error: err,
      });
    });
};

exports.updateProduct = (req, res) => {
  const product = new Products(req.body);
  Products.updateOne({ _id: req.body.id }, product)
    .then((result) => {
      res.status(200).json({
        message: "Update successful",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "update product failed",
      });
    });
};

exports.deleteProduct = (req, res) => {
  Products.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting product failed",
      });
    });
};
