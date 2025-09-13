import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon
          product={product}
          className="absolute top-4 right-5 text-red-600"
        />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="tex-lg">{product.name}</div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              $ {product.price}
            </span>

          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
