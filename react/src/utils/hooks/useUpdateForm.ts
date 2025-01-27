import axios, { AxiosResponse } from "axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import {CommonResponseType, FormDataType} from "../../constants/Type"
import {UPDATE_FORM_API} from "../../constants/ApiConstant.ts";
import {ReactQueryKey} from "../../constants/ReactQueryKey.ts";

interface UpdateFormBodyType extends Omit<FormDataType, "createdAt"|"updatedAt"> {}

const useUpdateForm = () => {
    const queryClient = useQueryClient()
    const mutationFn = (payload: UpdateFormBodyType): Promise<AxiosResponse<CommonResponseType<{data: FormDataType}>>> => {
        return axios.post(UPDATE_FORM_API, payload);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
    }

    const { mutate: updateForm } = useMutation({
        mutationFn: mutationFn,
        onSuccess: onSuccess
    })

    return { updateForm }
}

export default useUpdateForm;
