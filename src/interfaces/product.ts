export interface IProduct {
    _id?: number | string
    name: string,
    category?: string,
    price: number,
    gallery?: string[],
    image: string,
    description: string,
    discount: number,
    featured: boolean,
    countInStock: number
}