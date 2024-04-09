import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './useStorage'
import axios from 'axios'
import { ChangeEvent } from 'react'
import { debounce, reduce } from "lodash"
const useCart = () => {
    const queryClient = useQueryClient()
    const [user] = useLocalStorage('user', {})
    const userId = user?.user?._id

    const { data, ...restQuery } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/carts/${userId}`)
            return data
        }
    })

    const updateQuantityDebounce = debounce(async (productId, quantity: number) => {
        await axios.post(`http://localhost:8080/api/v1/carts/update`, {
            userId,
            productId,
            quantity
        })
        queryClient.invalidateQueries({
            queryKey: ['cart', userId]
        })
    }, 300)

    const { mutate } = useMutation({
        mutationFn: async ({ action, productId, quantity }: { action: string; productId: any ; quantity: number}) => {
            if (!productId) {
                console.error("productId is undefined");
                return;
            }
            switch (action) {
                case 'ADD':
                    await axios.post(`http://localhost:8080/api/v1/carts/add-to-cart`, {
                        userId,
                        productId,
                        quantity
                    })
                    break
                case 'INCREMENT':
                    await axios.post(`http://localhost:8080/api/v1/carts/increase`, {
                        userId,
                        productId
                    })
                    break
                case 'DECREMENT':
                    await axios.post(`http://localhost:8080/api/v1/carts/decrease`, {
                        userId,
                        productId
                    })
                    break
                case 'REMOVE':
                    await axios.post(`http://localhost:8080/api/v1/carts/remove-from-cart`, {
                        userId,
                        productId
                    })
                    break
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart', userId]
            })
        }
    })

    const handleQuantityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(e.target.value)
        updateQuantityDebounce(productId, quantity)
    }
    const calculateTotal = () => {
        if (!data || !data.products) return 0
        return reduce(data.products, (total, product) => total + product.price * product.quantity, 0)
    }

    return {
        data,
        mutate,
        calculateTotal,
        handleQuantityChange,
        ...restQuery
    }
}

export default useCart