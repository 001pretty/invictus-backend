const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

var mongoose = require("mongoose");

const MenItem = require("../models/menitem");
const WomenItem = require("../models/womenitem");
const LimitedItem = require("../models/limiteditem");
const KidsItem = require("../models/kidsitem");
const SaleItem = require("../models/saleitem");
const User = require("../models/user");
const Order = require("../models/order");

exports.getMenItems = async (req, res, next) => {
  let totalMenItems;
  try {
    const totalMenItems = await MenItem.find().countDocuments();
    MenItem.find({}).sort({ createdAt: 1 }).exec((err, docs) => { 
      res.status(200).json({
        message: "Fetched men items successfully.",
        menItems: docs,
        totalMenItems: totalMenItems, 
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getWomenItems = async (req, res, next) => {
  let totalWomenItems;
  try {
    const totalWomenItems = await WomenItem.find().countDocuments();
    const womenItems = await WomenItem.find();
    res.status(200).json({
      message: "Fetched women items successfully.",
      womenItems: womenItems,
      totalWomenItems: totalWomenItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getLimitedItems = async (req, res, next) => {
  let totalLimitedItems;
  try {
    const totalLimitedItems = await LimitedItem.find().countDocuments();
    const limitedItems = await LimitedItem.find();
    res.status(200).json({
      message: "Fetched limited items successfully.",
      limitedItems: limitedItems,
      totalLimitedItems: totalLimitedItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getKidsItems = async (req, res, next) => {
  let totalKidsItems;
  try {
    const totalKidsItems = await KidsItem.find().countDocuments();
    const kidsItems = await KidsItem.find();
    res.status(200).json({
      message: "Fetched kids items successfully.",
      kidsItems: kidsItems,
      totalKidsItems: totalKidsItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSaleItems = async (req, res, next) => {
  let totalSaleItems;
  try {
    const totalSaleItems = await SaleItem.find().countDocuments();
    const saleItems = await SaleItem.find();
    res.status(200).json({
      message: "Fetched sale items successfully.",
      saleItems: saleItems,
      totalSaleItems: totalSaleItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.createMenItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const menItem = new MenItem({
    imageUrl: req.body.imageUrl,
    imageUrl2: req.body.imageUrl2,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    material: req.body.material,
    sizefit: req.body.sizefit,
  });
  menItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Men item added successfully!",
        menItem: menItem,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createWomenItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const womenItem = new WomenItem({
    imageUrl: req.body.imageUrl,
    imageUrl2: req.body.imageUrl2,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    material: req.body.material,
    sizefit: req.body.sizefit,
  });
  womenItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Womens item added successfully!",
        womenItem: womenItem,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createLimitedItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const limitedItem = new LimitedItem({
    imageUrl: req.body.imageUrl,
    imageUrl2: req.body.imageUrl2,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    material: req.body.material,
    sizefit: req.body.sizefit,
  });
  limitedItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Limited item added successfully!",
        limitedItem: limitedItem,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createKidsItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const kidsItem = new KidsItem({
    imageUrl: req.body.imageUrl,
    imageUrl2: req.body.imageUrl2,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    material: req.body.material,
    sizefit: req.body.sizefit,
  });
  kidsItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Kids item added successfully!",
        kidsItem: kidsItem,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createSaleItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const saleItem = new SaleItem({
    imageUrl: req.body.imageUrl,
    imageUrl2: req.body.imageUrl2,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    material: req.body.material,
    sizefit: req.body.sizefit,
  });
  saleItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Sale item added successfully!",
        saleItem: saleItem,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getItem = (req, res, next) => {
  const itemId = req.params.itemId;
  MenItem.findById(itemId)
    .then((item) => {
      if (item) {
        res.status(200).json({ message: "Men item fetched.", item: item });
      }
    })
    .then(
      WomenItem.findById(itemId).then((item) => {
        if (item) {
          res.status(200).json({ message: "Women item fetched.", item: item });
        }
      })
    )
    .then(
      KidsItem.findById(itemId).then((item) => {
        if (item) {
          res.status(200).json({ message: "Kids item fetched.", item: item });
        }
      })
    )
    .then(
      SaleItem.findById(itemId).then((item) => {
        if (item) {
          res.status(200).json({ message: "Sale item fetched.", item: item });
        }
      })
    )
    .then(
      LimitedItem.findById(itemId).then((item) => {
        if (item) {
          res
            .status(200)
            .json({ message: "Limited item fetched.", item: item });
        }
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postCart = (req, res, next) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;

  User.findById(userId)
    .then((retrievedUser) => {
      if (retrievedUser._id.toString() !== userId.toString()) {
        throw error;
      }
      retrievedUser.cart.push(itemId);
      return retrievedUser.save().then((result) => {
        console.log("UPDATED USER!");
        res.status(200).json({ message: "Cart updated successfuly." });
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCartItems = (req, res, next) => {
  const userId = req.body.userId;

  let foundCartItems = [];

  User.findById(userId)
    .then((retrievedUser) => {
      if (retrievedUser._id.toString() !== userId.toString()) {
        throw error;
      }
      return retrievedUser.cart;
    })
    .then((cartArray) => {
      let quantities = cartArray.reduce(
        (acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1,
        }),
        {}
      );

      MenItem.find()
        .where("_id")
        .in(cartArray)
        .exec((err, records) => {
          foundCartItems = foundCartItems.concat(records);
          WomenItem.find()
            .where("_id")
            .in(cartArray)
            .exec((err, records) => {
              foundCartItems = foundCartItems.concat(records);
              KidsItem.find()
                .where("_id")
                .in(cartArray)
                .exec((err, records) => {
                  foundCartItems = foundCartItems.concat(records);
                  SaleItem.find()
                    .where("_id")
                    .in(cartArray)
                    .exec((err, records) => {
                      foundCartItems = foundCartItems.concat(records);
                      LimitedItem.find()
                        .where("_id")
                        .in(cartArray)
                        .exec((err, records) => {
                          foundCartItems = foundCartItems.concat(records);
                          foundCartItems = foundCartItems.map((i) => ({
                            ...i._doc,
                            q: quantities,
                          }));
                          res.status(200).json({
                            message: "Fetched cart items successfully.",
                            foundCartItems: foundCartItems,
                          });
                        });
                    });
                });
            });
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.removeCart = (req, res, next) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;

  User.findById(userId)
    .then((retrievedUser) => {
      if (retrievedUser._id.toString() !== userId.toString()) {
        throw error;
      }
      const index = retrievedUser.cart.indexOf(itemId);
      if (index > -1) {
        retrievedUser.cart.splice(index, 1);
      }
      return retrievedUser.save().then((result) => {
        console.log("USER CART ITEM REMOVED!");
        res.status(200).json({ message: "Cart item removed successfuly." });
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const userId = req.body.user.userId;

  const order = new Order({
    products: req.body.products,
    user: req.body.user,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order proceeded successfuly!",
      });
      return "success";
    })
    .then((result) => {
      if (result === "success") {
        User.findById(userId).then((retrievedUser) => {
          if (retrievedUser._id.toString() !== userId.toString()) {
            throw error;
          }
          retrievedUser.cart = [];
          return retrievedUser.save();
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOrder = (req, res, next) => {
  const userId = req.body.userId;

  Order.find({ "user.userId": userId })
    .then((retrievedOrders) => {
      res.json({
        message: "Fetched orders successfuly!",
        orders: retrievedOrders,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSearchItems = async (req, res, next) => {
  let term = req.body.searchTerm
  let foundSearchItems = [];
  console.log(term)

  MenItem.find({ "name": {$regex : `.*${term}.*`} })
  .then((results) => {
      console.log(results)
      foundSearchItems = foundSearchItems.concat(results);
      WomenItem.find({ "name": {$regex : `.*${term}.*`} })
      .then((results) => {
          foundSearchItems = foundSearchItems.concat(results);
          KidsItem.find({ "name": {$regex : `.*${term}.*`} })
          .then((results) => {
              foundSearchItems = foundSearchItems.concat(results);
              SaleItem.find({ "name": {$regex : `.*${term}.*`} })
              .then((results) => {
                  foundSearchItems = foundSearchItems.concat(results);
                  LimitedItem.find({ "name": {$regex : `.*${term}.*`} })
                  .then((results) => {
                      foundSearchItems = foundSearchItems.concat(results);
                      res.status(200).json({
                        message: "Performed search successfully!",
                        foundItems: foundSearchItems,
                      });
                    });
                });
            });
          })
  })
  .catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });

};

exports.getFitItems = async (req, res, next) => {
  try {
    const fitItems = await FitItem.find();
    res.status(200).json({
      message: "Fetched fit items successfully.",
      fitItems: fitItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
