import axios, { AxiosResponse } from "axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import {CommonResponseType, FormDataType} from "../../constants/Type"
import {CREATE_FORM_API} from "../../constants/ApiConstant.ts";
import {ReactQueryKey} from "../../constants/ReactQueryKey.ts";

interface CreateFormBodyType extends Omit<FormDataType, "id"|"createdAt"|"updatedAt"> {}

interface UseCreateFormType {
    onSuccess: () => void;
    onError: () => void
}

const useCreateForm = (params: UseCreateFormType) => {
    // const queryClient = useQueryClient()
    const mutationFn = (payload: CreateFormBodyType): Promise<AxiosResponse<CommonResponseType<{data: FormDataType}>>> => {
        return axios.post(CREATE_FORM_API, payload);
    }

    // const onSuccess = () => {
    //     queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
    // }

    const { mutate: createForm } = useMutation({
        mutationFn: mutationFn,
        onSuccess: onSuccess
    })

    return { createForm }
}

export default useCreateForm;
