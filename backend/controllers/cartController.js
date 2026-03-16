// import { Cart } from "../models/cartModel.js";
// import { Product } from "../models/productModel.js";

// //get cart
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const cart = await Cart.findOne({ userId }).populate("items.productId");
//     if (!cart) {
//       return res.json({ success: true, cart: [] });
//     }
//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //add to cart
// // export const addToCart = async (req, res) => {
// //   try {
// //     const userId = req.id;
// //     const { productId } = req.body;
// //     //check if product exists
// //     const product = await Product.findById(productId);
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found",
// //       });
// //     }
// //     //find the user's cart (if exist)

// //     let cart = await Cart.findOne({ userId });

// //     //if cart doesn't exists, create a new one
// //     if (!cart) {
// //       cart = new Cart({
// //         userId,
// //         items: [{ productId, quantity: 1, price: product.productPrice }],
// //         totalPrice: product.productPrice,
// //       });
// //     } else {
// //       //find if prodict is already in the cart
// //       const itemIndex = cart.items.findIndex(
// //         (item) => item.productId.toString() === productId,
// //       );
// //       if (itemIndex > -1) {
// //         //if product exists -> just increase quantity
// //         cart.items[itemIndex].quantity += 1;
// //       } else {
// //         //if new product -> push to cart
// //         cart.items.push({
// //           productId,
// //           quantity: 1,
// //           price: product.productPrice,
// //         });
// //       }

// //       //recalculate total price
// //       cart.totalPrice = cart.items.reduce(
// //         (acc, item) => acc + item.price * item.quantity,
// //       );
// //     }
// //     //save updated cart
// //     await cart.save();
// //     //populate product details before sending response
// //     const populatedCart = await Cart.findById(cart._id).populate(
// //       "items.productId",
// //     );
// //     res.status(200).json({
// //       success: true,
// //       message: "Product added to successfully",
// //       cart: populatedCart,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId } = req.body;
    
//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Find the user's cart (if exist)
//     let cart = await Cart.findOne({ userId });

//     // If cart doesn't exist, create a new one
//     if (!cart) {
//       cart = new Cart({
//         userId,
//         // DHYAN DEIN: Agar aapne DB me abhi bhi 'qunatity' rakha hai, toh yahan wahi likhein
//         items: [{ productId, qunatity: 1, price: product.productPrice }], 
//         totalPrice: product.productPrice,
//       });
//     } else {
//       // Find if product is already in the cart
//       const itemIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (itemIndex > -1) {
//         // If product exists -> just increase
//         cart.items[itemIndex].qunatity += 1; // TYPO WALI SPELLING
//       } else {
//         // If new product -> push to cart
//         cart.items.push({
//           productId,
//           qunatity: 1, // TYPO WALI SPELLING
//           price: product.productPrice,
//         });
//       }

//       // ✅ RECALCULATE TOTAL PRICE (Yahan ', 0' lagana sabse zaroori hai)
//       cart.totalPrice = cart.items.reduce((acc, item) => {
//         return acc + (item.price * item.qunatity); // TYPO WALI SPELLING
//       }, 0); 
//     }

//     // Save updated cart
//     await cart.save();
    
//     // Populate product details before sending response
//     const populatedCart = await Cart.findById(cart._id).populate(
//       "items.productId"
//     );
    
//     return res.status(200).json({
//       success: true,
//       message: "Product added successfully",
//       cart: populatedCart,
//     });
//   } catch (error) {
//     console.log("Add to cart error: ", error); // Terminal mein error dekhne ke liye
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //update quantity

// // export const updateQuantity = async (req, res) => {
// //   try {
// //     const userId = req.id;
// //     const { productId, type } = req.body;

// //     // 1. यूज़र का कार्ट ढूँढना
// //     let cart = await Cart.findOne({ userId });
// //     if (!cart) {
// //       return res.status(404).json({ success: false, message: "Cart not found" });
// //     }

// //     // 2. कार्ट में प्रोडक्ट ढूँढना
// //     const item = cart.items.find(item => item.productId.toString() === productId);
// //     if (!item) {
// //       return res.status(404).json({ success: false, message: "Item not found" });
// //     }

// //     // 3. Quantity अपडेट करना
// //     if (type === "increase") {
// //       item.quantity += 1;
// //     }
    
// //     if (type === "decrease" && item.quantity > 1) {
// //       item.quantity -= 1;
// //     }

// //     // 4. नई Total Price कैलकुलेट करना
// //     cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
// //     // 5. डेटाबेस में सेव करना और रिस्पॉन्स भेजना
// //     await cart.save();
// //     cart = await cart.populate("items.productId");

// //     return res.status(200).json({
// //       success: true,
// //       cart
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };
// export const updateQuantity = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId, type } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     const item = cart.items.find(item => item.productId.toString() === productId);
//     if (!item) return res.status(404).json({ success: false, message: "Item not found" });

//     // YAHAN TYPO WALI SPELLING USE KI HAI (qunatity)
//     if (type === "increase") {
//       item.qunatity += 1; 
//     } 
//     else if (type === "decrease" && item.qunatity > 1) {
//       item.qunatity -= 1;
//     }

//     // YAHAN BHI TYPO WALI SPELLING USE KI HAI
//     cart.totalPrice = cart.items.reduce((acc, currentItem) => {
//        return acc + (currentItem.price * currentItem.qunatity);
//     }, 0);
    
//     await cart.save();
//     const populatedCart = await Cart.findById(cart._id).populate("items.productId");

//     return res.status(200).json({ success: true, cart: populatedCart });

//   } catch (error) {
//     console.log("Update Quantity Error:", error); // Terminal me error dekhne ke liye
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
// //remove cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId } = req.body;

//     // 1. यूज़र का कार्ट ढूँढना
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found"
//       });
//     }

//     // 2. 🚨 असली फिक्स: कार्ट से आइटम हटाना (Filter Out)
//     // हम सिर्फ उन आइटम्स को रखेंगे जिनकी ID उस productId से अलग है जिसे हमें हटाना है
//     cart.items = cart.items.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     // 3. नई Total Price कैलकुलेट करना (सही स्पेलिंग 'quantity' के साथ)
//     cart.totalPrice = cart.items.reduce(
//       (acc, item) => acc + item.price * item.quantity, 
//       0
//     );

//     // 4. डेटाबेस में सेव करना
//     await cart.save();
    
//     // (Optional) अगर आप चाहते हैं कि रिस्पॉन्स में प्रोडक्ट की पूरी डिटेल्स जाएं, 
//     // तो आप यहाँ भी populate का इस्तेमाल कर सकते हैं:
//     // await cart.populate("items.productId");

//     return res.status(200).json({
//       success: true,
//       cart
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.json({ success: true, cart: [] });
    }
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the user's cart (if exist)
    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, qunatity: 1, price: product.productPrice }], // Using DB typo
        totalPrice: product.productPrice,
      });
    } else {
      // Find if product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If product exists -> just increase
        cart.items[itemIndex].qunatity += 1; 
      } else {
        // If new product -> push to cart
        cart.items.push({
          productId,
          qunatity: 1, 
          price: product.productPrice,
        });
      }

      // Recalculate total price using 'qunatity'
      cart.totalPrice = cart.items.reduce((acc, item) => {
        return acc + (item.price * item.qunatity); 
      }, 0); 
    }

    // Save updated cart
    await cart.save();
    
    // Populate product details before sending response to frontend
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId"
    );
    
    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      cart: populatedCart,
    });
  } catch (error) {
    console.log("Add to cart error: ", error); 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (type === "increase") {
      item.qunatity += 1; 
    } 
    else if (type === "decrease" && item.qunatity > 1) {
      item.qunatity -= 1;
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((acc, currentItem) => {
       return acc + (currentItem.price * currentItem.qunatity);
    }, 0);
    
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");

    return res.status(200).json({ success: true, cart: populatedCart });

  } catch (error) {
    console.log("Update Quantity Error:", error); 
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    // 1. Find user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // 2. Filter out the item to remove it
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // 3. FIX: Calculate new total price using the 'qunatity' typo
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + (item.price * item.qunatity), 
      0
    );

    // 4. Save to DB
    await cart.save();
    
    // 5. FIX: Populate the cart so frontend doesn't crash on update
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");

    return res.status(200).json({
      success: true,
      cart: populatedCart // Send the populated cart back
    });

  } catch (error) {
    console.log("Remove from cart error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};