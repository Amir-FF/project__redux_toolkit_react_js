// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../utils/generateId";
import { LOREM_IPSUM } from "../constants/text";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [
      {
        id: generateId(),
        name: "Xiaomi Mi Band 5",
        description: LOREM_IPSUM,
        image: "/images/product-1.jpg",
        price: 199,
      },
      {
        id: generateId(),
        name: "Big Power Sound Speaker",
        description: LOREM_IPSUM,
        image: "/images/product-2.jpg",
        price: 279,
      },
      {
        id: generateId(),
        name: "WiFi Security Camera",
        description: LOREM_IPSUM,
        image: "/images/product-3.jpg",
        price: 399,
      },
      {
        id: generateId(),
        name: "PX7 Wireless Headphones",
        description: LOREM_IPSUM,
        image: "/images/product-4.jpg",
        price: 100,
      },
    ],
  },

  reducers: {},
});

export default productsSlice.reducer;
