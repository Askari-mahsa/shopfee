import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type NewProduct = {
  title: string;
  price: number;
  rating: number;
  description: string;
  thumbnail: string;
};

export const useAddProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (newProduct: NewProduct) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<NewProduct, Error, NewProduct>({
    mutationFn: async (newProduct) => {
      const res = await axios.post(
        "https://dummyjson.com/products/add",
        newProduct,
      );
      return res.data;
    },

    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              products: [newProduct, ...oldData.pages[0].products],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });

      onSuccess?.(newProduct);
    },

    onError: (error) => {
      onError?.(error);
    },
  });
};
