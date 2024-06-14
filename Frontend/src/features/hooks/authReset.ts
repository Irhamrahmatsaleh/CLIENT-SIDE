import { registerForm, resetForm } from "@/libs/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordSchema } from "../validators/password-form";
import { api } from "../../libs/api";
import { resetSchema } from "../validators/reset-form";

export const useResetForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<resetForm>({
        mode: "onChange",
        resolver: zodResolver(resetSchema)
      })

    const onSubmit: SubmitHandler<resetForm> = async(data) => {
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