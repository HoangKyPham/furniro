import axios from "axios";
import instance from "../configs/axios";
import { IProduct } from "../interfaces/product";


export const uploadFiles = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "asm-upload"); // Thay bằng upload preset của bạn
        formData.append('folder', "ECMA_ASM")
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/doln3j7lw/upload", // Thay bằng cloudinary name của bạn
            formData,
        );
        return response.data.url
    } catch (error) {
        console.error(error);
    }
};



export const getAllProducts = async (params?: any): Promise<IProduct[]> => {
    try {
        const response = await instance.get('/products');
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getProductById = async (id: number | string) => {
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const updateProduct = async (product: IProduct) => {
    try {
        const response = await instance.put(`/products/${product._id}`, product);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const deleteProduct = async (product: IProduct) => {
    try {
        const response = await instance.delete(`/products/${product._id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}