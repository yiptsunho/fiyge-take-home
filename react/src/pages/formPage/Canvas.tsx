import React, {useContext, useEffect, useState} from "react";
import {Divider, Grid2} from "@mui/material";
import CanvasGrid from "./CanvasGrid.tsx";
import {FormPageContext} from "./FormPage.tsx";
import Button from "@mui/material/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {GenericInputComponentType, SaveFormRequestType, UpdateFormRequestType} from "../../constants/Type.ts";
import axios from "axios";
import {CREATE_FORM_API, UPDATE_FORM_API} from "../../constants/ApiConstant.ts";
import useSnackbar from "../../utils/hooks/useSnackbar.ts";
import PreviewModal from "./PreviewModal.tsx";
import EditComponentModal from "./EditComponentModal.tsx";
import usePreviewModal from "../../utils/hooks/usePreviewModal.ts";
import useEditComponentModal from "../../utils/hooks/useEditComponentModal.ts";
import TextField from "@mui/material/TextField";
import {ReactQueryKey} from "../../constants/ReactQueryKey.ts";

function Canvas() {
    const { componentList, setComponentList, currentForm } = useContext(FormPageContext)
    const {openSnackbar, setSnackbarSeverity, setSnackbarMessage} = useSnackbar()
    const queryClient = useQueryClient()
    const {mutate: saveForm} = useMutation({
        mutationFn: (payload: SaveFormRequestType) => {
            return axios.post(CREATE_FORM_API, payload);
        },
        onSuccess: () => {
            setSnackbarSeverity("success")
            setSnackbarMessage("Save form successful!")
            openSnackbar()
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
        },
        onError: () => {
            setSnackbarSeverity("error")
            setSnackbarMessage("Save form failed")
            openSnackbar()
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
        }
    })
    const {mutate: updateForm} = useMutation({
        mutationFn: (payload: UpdateFormRequestType) => {
            return axios.put(`${UPDATE_FORM_API}/${payload.id}`, payload);
        },
        onSuccess: () => {
            setSnackbarSeverity("success")
            setSnackbarMessage("Update form successful!")
            openSnackbar()
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
        },
        onError: () => {
            setSnackbarSeverity("error")
            setSnackbarMessage("Update form failed")
            openSnackbar()
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.ALL_FORMS] })
        }
    })
    const {showPreviewModal, openPreviewModal, closePreviewModal} = usePreviewModal()
    const {showEditComponentModal, openEditComponentModal, closeEditComponentModal} = useEditComponentModal()
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editingComponent, setEditingComponent] = useState<GenericInputComponentType | null>(null)
    const [formName, setFormName] = useState<string>(currentForm !== null ? currentForm.formName : "")

    const onClickPreview = () => {
        openPreviewModal()
    }

    const handleClosePreviewModal = () => {
        closePreviewModal()
    }

    const onClickEditComponent = (index: number, component: GenericInputComponentType) => {
        setEditingComponent(component)
        setEditingIndex(index)
        openEditComponentModal()
    }

    const handleCloseEditComponentModal = () => {
        closeEditComponentModal()
    }

    const onClickSave = () => {
        if (formName.trim().length === 0) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Please input form name")
            openSnackbar()
            return
        }

        const componentListNullFiltered = componentList.filter(component => component !== null)
        const body = {
            formName: formName,
            formData: JSON.stringify(componentListNullFiltered)
        }
        saveForm(body)
    }

    const onClickUpdate = () => {
        if (currentForm === null) {
            return
        }

        if (formName.trim().length === 0) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Please input form name")
            openSnackbar()
            return
        }

        const componentListNullFiltered = componentList.filter(component => component !== null)
        const body = {
            id: currentForm.id,
            formName: formName,
            formData: JSON.stringify(componentListNullFiltered)
        }
        updateForm(body)
    }

    const onClickSaveEditingComponent = (index: number, newComponent: GenericInputComponentType) => {
        setComponentList(prevState => {
            if (prevState === null) {
                return prevState
            }

            const newState = [...prevState]
            newState.splice(index, 1, newComponent)
            return newState
        })
        closeEditComponentModal()
    }

    const onChangeFormName = (e) => {
        const newFormName = e.target.value
        setFormName(newFormName)
    }

    useEffect(() => {
        if (currentForm !== null) {
            setFormName(currentForm.formName)
            try {
                const newComponentList: (GenericInputComponentType | null)[] = JSON.parse(currentForm.formData)
                if (!newComponentList.includes(null)) {
                    newComponentList.push(null)
                }
                setComponentList(newComponentList)
            } catch (err) {
                if (err instanceof SyntaxError) {
                    setSnackbarSeverity("error")
                    setSnackbarMessage("Form data invalid")
                    openSnackbar()
                }
            }
        }
    }, [currentForm])

    return (
        <React.Fragment>
            <PreviewModal
                open={showPreviewModal}
                handleClose={handleClosePreviewModal}
            />
            <EditComponentModal
                open={showEditComponentModal}
                handleClose={handleCloseEditComponentModal}
                component={editingComponent}
                index={editingIndex}
                onClickSave={onClickSaveEditingComponent}
            />
            <Grid2 display="flex" justifyContent="start" padding={2}>
                <TextField
                    variant="outlined"
                    name="formName"
                    label="Form name"
                    required={true}
                    value={formName}
                    onChange={onChangeFormName}
                />
            </Grid2>
            <Divider />
            <Grid2 container spacing={2} paddingY={2} paddingX={2}>
                {componentList.map((component, index) => {
                    return (
                        <CanvasGrid
                            key={index}
                            index={index}
                            component={component}
                            onClickEditComponent={onClickEditComponent}
                            preview={false}
                        />
                    )
                })}
            </Grid2>
            <Button
                size="large"
                onClick={onClickPreview}
                style={{ marginRight: 8, marginBottom: 16 }}
                disabled={componentList.filter(component => component !== null).length === 0}
            >
                Preview
            </Button>
            {currentForm === null || !currentForm.id ?
                <Button
                    variant="contained"
                    size="large"
                    onClick={onClickSave}
                    style={{ marginBottom: 16 }}
                >
                    Save
                </Button>
                :
                <Button
                    variant="contained"
                    size="large"
                    onClick={onClickUpdate}
                    style={{ marginBottom: 16 }}
                >
                    Update
                </Button>
            }
        </React.Fragment>
    )
}

export default Canvas;
