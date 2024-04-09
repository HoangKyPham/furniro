import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useOderQuery = (role?: string, userId?: number | string, orderId?: any) => {
    const { data, ...rest } = useQuery({
        queryKey: ["ORDER_KEY", role, orderId, userId], 
        queryFn: async () => {
            console.log(userId,role);
            if (role === "user" && userId) {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/user/${userId}`);
                return response.data;
            }
            if (orderId) {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/${orderId}`);
                console.log(response.data);
                return response.data;
            }
            if (role === "admin") {
                const response = await axios.get(`http://localhost:8080/api/v1/orders`);
                console.log(response.data);
                return response.data;
            }
        }
    });

    return { data, ...rest };
}

export default useOderQuery;