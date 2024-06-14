import { editProfileForm, registerForm, users } from "@/libs/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../validators/register-form";
import { api } from "../../libs/api";
import { profileSchema } from "../validators/profileSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../component/profileCard";

export const useEditProfileForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<editProfileForm>({
        mode: "onTouched",
        resolver: zodResolver(profileSchema)
      })

    const { refetch } = useQuery<editProfileForm>({
      queryKey: ["profile"],
      queryFn: fetchProfile,
      });

    const { mutateAsync } = useMutation<
    users,
    AxiosError,
    editProfileForm
    >({
        mutationFn: async(data: editProfileForm) => {
          const formData =  new FormData();
          formData.append('full_name', data.full_name);
          formData.append('username', data.username);
          formData.append('bio', data.bio);
          if (data.photo_profile && data.photo_profile[0]) {
              formData.append('photo_profile', data.photo_profile[0]);
              }

          const token = localStorage.getItem('token');

          return await Axios({
              method: "patch",
              url: `${api}/user`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data",'Authorization': `Bearer ${token}` },
              })
        },
    });

    const onSubmit: SubmitHandler<editProfileForm> = async(data) => {
        try {
            await mutateAsync(data);
            refetch();
            } catch (error) {
            // handle error
            console.log(error);
            }
    }

        return {
          register,
          handleSubmit,
          onSubmit,
          errors
        }

}