import axios, { AxiosResponse } from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {CommonResponseType, FormDataType} from "../../constants/Type"
import {GET_FORM_API} from "../../constants/ApiConstant.ts";
import {ReactQueryKey} from "../../constants/ReactQueryKey.ts";

type UseGetFormParams = {
    id: number;
}

const useGetForm = (params: UseGetFormParams) => {
    const { id } = params
    const queryClient = useQueryClient()
    const queryFn = (): Promise<AxiosResponse<CommonResponseType<{data: FormDataType}>>> => {
        return axios.get(`${GET_FORM_API}/${id}`)
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: [ReactQueryKey.FORM, { id }],
        queryFn: queryFn
    })

    const refetchForm = () => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKey.FORM, { id }] })
    }

    return { data: data?.data.data, isLoading, isError, error, refetchForm }
}

export default useGetForm;
