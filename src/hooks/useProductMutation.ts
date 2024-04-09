import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces/product";
import { addProduct, deleteProduct, updateProduct } from "../services/product";


type Inputs = {
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

type useProductMutationProps = {
    action : "CREATE" | "UPDATE" | "DELETE" ,
    callback?: () => void
}

const useProductMutation = ({action, callback} : useProductMutationProps) => {
    const queryClient = useQueryClient()
   
    const navigate = useNavigate();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (product : IProduct) => {
            console.log(product);
            switch (action) {
                case "CREATE":
                    await addProduct(product);
                    break;
                case "UPDATE":
                    await updateProduct(product);
                    break;
                case "DELETE":
                    await deleteProduct(product);
                    break;
                default:
                    return null;
            }
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT_KEY']
            })
            callback && callback();
        }
    })
    const form = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (product) => {
        mutate(product)
    };

    const onRemove = (product: IProduct) => {
        mutate(product)
    }

    return {
        onRemove,
        onSubmit,
        form,
        ...rest
    }

}

export default useProductMutation