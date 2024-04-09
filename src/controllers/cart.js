import { StatusCodes } from "http-status-codes";
import Cart from "../models/cartModel";

export const addItemCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // kiem tra gio hang co ton tai dua tren userid
        let cart = await Cart.findOne({ userId })
        //ko ton tai thi tao gio hang moi
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }
        
        // kiem tra san pham co tron gio hang
        const existProductIndex = cart.products.findIndex(
            (item) => item.productId.toString() == productId
        )
        //neu ton tai thi cap nhat so luong
        if (existProductIndex !== -1) {
            cart.products[existProductIndex].quantity += quantity; 
        }else{
        //neu chua thi them moi
            cart.products.push({productId, quantity})
        }
        await cart.save();
        return res.status(StatusCodes.OK).json({cart});

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
    }

}

export const getCartByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const cart = await Cart.findOne({userId}).populate("products.productId");

        const cartData = {
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
            }))
        };
        return res.status(StatusCodes.OK).json({products: cartData.products});
        
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
    }
}

export const removeFromCart = async (req, res) => {
    const {userId, productId} = req.body;
    try {
        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({message: error.message});
        }
        cart.products = cart.products.filter(
            (product) => product.productId && product.productId.toString() !== productId
        )
        await cart.save();
        return res.status(StatusCodes.OK).json({cart});
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message});

    }
}

// Cập nhật số lượng sản phẩm trong giỏ hàng thuộc 1 user
export const updateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        product.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) {}
};

// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        product.quantity++;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (product.quantity > 1) {
            product.quantity--;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};