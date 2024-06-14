import { passwordForm } from "@/libs/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../libs/api";
import { passwordSchema } from "../validators/password-form";

export const usePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<passwordForm>({
        mode: "onChange",
        resolver: zodResolver(passwordSchema)
      })

    const onSubmit: SubmitHandler<passwordForm> = async(data) => {
        try {
            const response = await Axios({
                method: "post",
                url: `${api}/register`,
                data: objectToFormData(data),
                headers: { "Content-Type": "multipart/form-data" },
                })
            // handle success
            console.log(response);
            const token = response.data.user.token;
            
            if (token) {
                localStorage.setItem("token", response.data.user.token);
                console.log("token ", token)
            }

            } catch (error) {
            // handle error
            console.log(error);
            }
    }

        function objectToFormData(obj: Record<string, any>): FormData{
            const formData = new FormData();
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
          }

        return {
          register,
          handleSubmit,
          onSubmit,
          errors
        }

}