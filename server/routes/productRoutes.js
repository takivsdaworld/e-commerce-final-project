import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Configure formidable options
const formidableOptions = {
  multiples: true,
  keepExtensions: true,
  maxFileSize: 5 * 1024 * 1024, // 5MB
};

//controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(
    authenticate,
    authorizeAdmin,
    formidable(formidableOptions),
    addProduct
  );

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductById)
  .put(
    authenticate,
    authorizeAdmin,
    formidable(formidableOptions),
    updateProductDetails
  )
  .delete(authenticate, authorizeAdmin, checkId, removeProduct);
router.route("/filtered-products").post(filterProducts);
export default router;
