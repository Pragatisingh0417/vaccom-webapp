"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useCart, Product as CartProduct } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDesc?: string;
  longDesc?: string;
  price: number;
  images: string[];
  features?: string[];
  rating?: number;
  sold?: number;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [notify, setNotify] = useState(""); 
  const [notifyColor, setNotifyColor] = useState("green"); 
  const [mainImage, setMainImage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Fetch product
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setMainImage(
          data.images && data.images.length > 0 ? data.images[0] : "/placeholder.png"
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Sync heart with wishlist
  useEffect(() => {
    if (!product) return;
    const exists = wishlist.some((item) => item.id === product._id);
    setInWishlist(exists);
  }, [wishlist, product]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const productForCart: CartProduct = {
    id: product._id,
    name: product.name,
    price: product.price,
    imageUrl: mainImage,
    slug: product.slug,
    brand: "Unknown",
  };

  const cartItem = cart.find((item) => item.id === productForCart.id);

  const toggleWishlist = () => {
    if (!inWishlist) {
      addToWishlist(productForCart);
      setNotify("Added to wishlist!");
      setNotifyColor("green");
    } else {
      removeFromWishlist(product._id);
      setNotify("Removed from wishlist!");
      setNotifyColor("red");
    }
    setInWishlist((prev) => !prev);
    setTimeout(() => setNotify(""), 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {notify && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-6 right-6 text-white px-4 py-2 rounded shadow-lg z-50 ${
              notifyColor === "green" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notify}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}
      <nav className="text-sm mb-4 text-gray-600">
        <span className="hover:underline cursor-pointer">Home</span> &gt;{" "}
        <span className="hover:underline cursor-pointer">Category</span>
      </nav>

      {/* Product layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2 flex flex-col items-center gap-2">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full max-w-md rounded-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          />

          {/* Thumbnails / hover images */}
          <div className="flex gap-2 mt-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-blue-500"
                onMouseEnter={() => setMainImage(img)}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {product.shortDesc && (
            <p className="text-gray-700">{product.shortDesc}</p>
          )}

          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-gray-600 ml-2">{product.sold || 0} sold</span>
          </div>

          <p className="text-2xl font-bold text-red-600">${product.price}</p>

          {product.features && (
            <ul className="list-disc list-inside text-red-700">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          )}

          {/* Add to Cart & Wishlist */}
          <div className="flex gap-2 mt-4">
            {cartItem ? (
              <div className="flex items-center gap-2 border rounded-full px-6 py-1 bg-gray-50">
                <button
                  onClick={() => decreaseQuantity(cartItem.id, 1)}
                  className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-medium">{cartItem.quantity}</span>
                <button
                  onClick={() => increaseQuantity(cartItem.id, 1)}
                  className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(productForCart, quantity)}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded hover:opacity-90 transition"
              >
                Add To Cart
              </button>
            )}

            <button
              onClick={toggleWishlist}
              className="flex items-center justify-center px-4 py-2 border rounded hover:bg-red-50 transition"
            >
              <FiHeart
                className={`w-6 h-6 ${
                  inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {product.longDesc && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Product Details</h2>
          <p className="text-gray-700 leading-relaxed">{product.longDesc}</p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => setShowReviews((prev) => !prev)}
          className="text-blue-600 font-semibold underline"
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>

        {showReviews && (
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-700">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Modal for viewing all images */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Image ${idx}`}
                  className="mb-2 w-full object-contain rounded"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
