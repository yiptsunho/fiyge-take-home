import axios, { AxiosResponse } from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {CommonResponseType, FormDataType} from "../../constants/Type"
import {GET_ALL_FORMS_API} from "../../constants/ApiConstant.ts";
import {ReactQueryKey} from "../../constants/ReactQueryKey.ts";

const useGetAllForms = () => {
    const queryClient = useQueryClient()
    const queryFn = (): Promise<AxiosResponse<CommonResponseType<FormDataType[]>>> => {
        return axios.get(GET_ALL_FORMS_API)
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: [ReactQueryKey.ALL_FORMS],
        queryFn: queryFn
    })

    const refetchAllForms = () => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
    }

    return { data: data?.data.data, isLoading, isError, error, refetchAllForms }
}

export default useGetAllForms;
