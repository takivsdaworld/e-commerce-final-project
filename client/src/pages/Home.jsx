import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery, useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/SmallProduct";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const { data: topProducts, isLoading: topLoading, error: topError } = useGetTopProductsQuery();

  return (
    <>
      {!keyword ? <Header /> : null}

      {/* Special Products Section */}
      {!keyword && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-center mb-4">Special Products</h1>
          {topLoading ? (
            <Loader />
          ) : topError ? (
            <Message variant="danger">
              {topError?.data?.message || topError?.message || "An error occurred"}
            </Message>
          ) : (
            <div className="flex justify-center flex-wrap">
              {topProducts.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Products Section */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">{keyword ? `Results for "${keyword}"` : "All Products"}</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.message || "An error occurred"}
          </Message>
        ) : (
          <div className="flex justify-center flex-wrap mt-[2rem]">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
