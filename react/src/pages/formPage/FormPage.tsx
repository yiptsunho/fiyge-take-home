import {Container, Grid2} from "@mui/material";
import SidePanel from "./SidePanel.tsx";
import Canvas from "./Canvas.tsx";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {FormDataType, GenericInputComponentType} from "../../constants/Type.ts";
import useGetAllForms from "../../utils/hooks/useGetAllForms.ts";

type FormPageContextType = {
    formList: FormDataType[] | null | undefined;
    currentForm: FormDataType | null;
    setCurrentForm: Dispatch<SetStateAction<FormDataType | null>>;
    componentList: (GenericInputComponentType | null)[];
    setComponentList: Dispatch<SetStateAction<(GenericInputComponentType | null)[]>>
    onDrop: (index: number, component: GenericInputComponentType) => void;
}

export const FormPageContext = createContext<FormPageContextType>({} as FormPageContextType)

function FormPage () {
    const {data: formList} = useGetAllForms()
    const [currentForm, setCurrentForm] = useState<FormDataType | null>(null)
    const [componentList, setComponentList] = useState<(GenericInputComponentType | null)[]>(new Array(1).fill(null))

    const onDrop = (index: number, component: GenericInputComponentType) => {
        const newComponentInForm = Object.assign({}, component)
        setComponentList(prevState => {
            const newComponentList = Array.from(prevState)

            newComponentList.splice(index, 1, newComponentInForm)
            if (!newComponentList.includes(null)) {
                newComponentList.push(null)
            }
            return newComponentList
        })
    }

    return (
        <FormPageContext.Provider value={{
            formList,
            currentForm,
            setCurrentForm,
            componentList,
            setComponentList,
            onDrop
        }}>
            <Container disableGutters style={{ display: "flex" }} maxWidth={false}>
                <Grid2 position="fixed" left="0" top="0" zIndex="1" height="100vh" width="20vw" sx={{ overflowX: "hidden" }}>
                    <SidePanel />
                </Grid2>
                <Grid2 marginLeft="20vw" paddingX="0" width="80vw" height="100vh">
                    <Canvas />
                </Grid2>
            </Container>
        </FormPageContext.Provider>
    )
}

export default FormPage;
