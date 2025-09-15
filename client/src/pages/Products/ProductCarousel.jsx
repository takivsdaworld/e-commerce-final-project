import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoPlaySpeed: 2000,
  };

  return (
    <div className="mb-4 flex justify-center items-center">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full max-w-lg"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[15rem]"
                />
                <div className="mt-4 flex flex-col md:flex-row justify-between md:gap-4">
                  <div className="one">
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <p className="text-blue-600 font-bold mb-2">$ {price}</p>
                    <p className="text-gray-400 mb-2">{description.substring(0, 170)} ...</p>
                  </div>
                  <div className="flex flex-col justify-between w-[16rem]">
                    <h1 className="flex items-center mb-2"><FaStore className="mr-2 text-white" /> Brand: {brand}</h1>
                    <h1 className="flex items-center mb-2"><FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}</h1>
                    <h1 className="flex items-center mb-2"><FaStar className="mr-2 text-white" /> Reviews: {numReviews}</h1>
                    <h1 className="flex items-center mb-2"><FaStar className="mr-2 text-white" /> Ratings: {Math.round(rating)}</h1>
                    <h1 className="flex items-center mb-2"><FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}</h1>
                    <h1 className="flex items-center mb-2"><FaBox className="mr-2 text-white" /> In Stock: {countInStock}</h1>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
