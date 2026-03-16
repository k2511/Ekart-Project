import razorpayInstance from "../config/razorpay.js"; // Ensure file extension if using ES Modules
import { Order } from "../models/orderModel.js";
import crypto from "crypto";
import { Cart } from "../models/cartModel.js";

export const createOrder = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency } = req.body;

        const options = {
            amount: Math.round(Number(amount) * 100), // convert to paise
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`
        };

        // 1. Create Order in Razorpay
        const razorpayOrder = await razorpayInstance.orders.create(options);

        // 2. Save Order in MongoDB
        const newOrder = new Order({
            user: req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency: currency || "INR",
            status: "Pending",
            razorpayOrderId: razorpayOrder.id // Mapping correct field name
        });

        await newOrder.save();

        res.json({
            success: true,
            order: razorpayOrder,
            dbOrder: newOrder
        });

    } catch (error) {
        console.log("❌ Error in create Order:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentFailed } = req.body;
        const userId = req.user._id;

        // Check if payment failed from frontend signal
        if (paymentFailed) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Payment Failed",
                order
            });
        }

        // 1. Generate Expected Signature
        // Formula: hmac_sha256(orderId + "|" + paymentId, secret)
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET) // Fixed Typo: RAZORPAY_SECRET
            .update(sign.toString())
            .digest("hex"); // Fixed Typo: .digest NOT .digit

        // 2. Compare Signatures
        if (expectedSignature === razorpay_signature) {
            // Success Logic
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: "Paid",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                },
                { new: true }
            );

            // Empty the cart after successful payment
            await Cart.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } });

            return res.json({
                success: true,
                message: "Payment Successful",
                order
            });

        } else {
            // Signature mismatch (Tampering attempt)
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({ 
                success: false, 
                message: "Invalid Signature / Verification Failed" 
            });
        }

    } catch (error) {
        console.log("❌ Error in Verify Payment:", error);
        res.status(500).json({ 
            success: false, // Fixed: should be false in catch block
            message: error.message 
        });
    }
};

export const getMyOrders = async (req, res) => { // Fixed typo: getMyOder -> getMyOrders
    try {
        // 1. userId check karein (Ensure your auth middleware sets req.user._id or req.id)
        const userId = req.user?._id || req.id; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // 2. Correct Mongoose Chain: .find() ke BAAD .populate() aata hai
        const orders = await Order.find({ user: userId })
            .populate({
                path: "products.productId",
                select: "productName productPrice productImg"
            })
            .populate("user", "firstName lastName email")
            .sort({ createdAt: -1 }); // Naye orders pehle dikhane ke liye

        // 3. Response
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
        
    } catch (error) {
        console.error("❌ Error Fetching user Orders:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//admin Only

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params; // URL se userId nikalna

        // Validate: Agar userId missing hai toh error bhejien
        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        const orders = await Order.find({ user: userId })
            .populate({
                path: "products.productId",
                // FIX: spelling 'productName' (pehle 'produdctName' tha)
                select: "productName productPrice productImg" 
            })
            // FIX: spelling 'firstName' (pehle 'fristName' tha)
            .populate("user", "firstName lastName email")
            .sort({ createdAt: -1 }); // Naye orders pehle dikhane ke liye

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
        
    } catch (error) {
        console.error("❌ Error fetching user order:", error);
        res.status(500).json({
            success: false, // consistency ke liye false add kiya
            message: error.message
        });
    }
};

export const getAllOrdersAdmin = async (req, res) => {
    try {
        // Saare orders fetch karein aur naye orders ko top par rakhein
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                // FIX: Aapke pichle code ke hisaab se firstName lastName hona chahiye
                select: "firstName lastName email" 
            })
            .populate({
                path: "products.productId",
                // Product ki image bhi add kar di taaki Admin panel mein dikh sake
                select: "productName productPrice productImg" 
            });

        // Response bhejien
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("❌ Admin Error Fetching All Orders:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all orders",
            error: error.message
        });
    }
};