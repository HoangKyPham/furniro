export interface IOrder {
    _id: string;
    userId: string;
    customerInfo: {
        name: string;
        email: string;
        phone: number;
        city: string;
    };
    items: {
        name: string;
        price: number;
        quantity: number;
        _id: string;
    }[];
    status: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}
