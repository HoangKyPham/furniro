import mongoose from "mongoose";

const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};

const OrderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        items: [OrderItemSchema],
        orderNumber: {
            type: String,
            auto: true,
            unique: true,
        },
        customerInfo: {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: Number,
                },
                email: {
                    type: String,
                    required: true,
                },
                payment: {
                    type: String,
                },
                city: {
                    type: String,
                },
            },
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true, versionKey: false }
);

OrderSchema.pre("save", function (next) {
    if (!this.orderNumber) {
        this.orderNumber = generateOrderNumber();
    }
    next();
});

export default mongoose.model("Order", OrderSchema);