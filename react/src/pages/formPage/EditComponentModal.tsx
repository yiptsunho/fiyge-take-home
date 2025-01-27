import {GenericInputComponentType, OptionInterface} from "../../constants/Type.ts";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Checkbox, FormControlLabel, Grid2, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import OptionsTable from "./OptionsTable.tsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    maxWidth: "80vw",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

type EditComponentModalProps = {
    open: boolean;
    handleClose: () => void;
    component: GenericInputComponentType | null;
    index: number | null;
    onClickSave: (index: number, newComponent: GenericInputComponentType) => void
}

function EditComponentModal(props: EditComponentModalProps) {
    const {open, handleClose, component, index, onClickSave} = props
    const [newComponent, setNewComponent] = useState<GenericInputComponentType | null>(Object.assign({}, component))
    const [options, setOptions] = useState<OptionInterface[]>(component && "options" in component ? component.options : [])

    useEffect(() => {
        setNewComponent(Object.assign({}, component))
    }, [component, open]);

    useEffect(() => {
        if (!open) {
            setNewComponent(null)
        }
    }, [open])

    const handleSave = () => {
        if (index === null || newComponent === null) {
            return
        }

        onClickSave(index, newComponent)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleSave()
    }

    const onChangeComponent = (name: string, value: string | boolean | OptionInterface[]) => {
        setNewComponent((prevState) => {
            if (prevState === null) {
                return null;
            }
            // Create a new object to avoid mutating the original state
            const newState = {
                ...prevState,
                [name]: value,
            };
            console.log(newState)
            return newState
        });
    }

    const onChangeOptions = (newOptions: OptionInterface[]) => {
        onChangeComponent("options", newOptions)
    }

    if (newComponent === null) {
        return <></>
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style} component={Paper} onSubmit={onSubmit}>
                <Grid2 container spacing={2} paddingY={2} paddingX={2}>
                    {"label" in newComponent &&
                        <Grid2 size={6}>
                            <TextField
                                label="Label"
                                name="label"
                                variant="outlined"
                                value={newComponent.label}
                                fullWidth
                                onChange={(e) => onChangeComponent("label", e.target.value)}
                            />
                        </Grid2>
                    }
                    {"required" in newComponent &&
                        <Grid2 size={6} display="flex">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={newComponent.required}
                                        onChange={(e) => onChangeComponent("required", e.target.checked)}
                                    />
                                }
                                label="This field is required"
                            />
                        </Grid2>
                    }
                    {"minLength" in newComponent &&
                        <Grid2 size={6}>
                            <TextField
                                label="Min. Length"
                                name="minLength"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={newComponent.minLength}
                                helperText="Leave this blank if you do not want to set a min. length"
                                onChange={(e) => onChangeComponent("minLength", e.target.value)}
                            />
                        </Grid2>
                    }
                    {"maxLength" in newComponent &&
                        <Grid2 size={6}>
                            <TextField
                                label="Max. Length"
                                name="maxLength"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={newComponent.maxLength}
                                helperText="Leave this blank if you do not want to set a max. length"
                                onChange={(e) => onChangeComponent("maxLength", e.target.value)}
                            />
                        </Grid2>
                    }
                    {"regex" in newComponent &&
                        <Grid2 size={6}>
                            <TextField
                                label="Regex"
                                name="regex"
                                variant="outlined"
                                fullWidth
                                value={newComponent.regex}
                                onChange={(e) => onChangeComponent("regex", e.target.value)}
                            />
                        </Grid2>
                    }
                    {"options" in newComponent &&
                        <Grid2 size={12}>
                            <OptionsTable
                                options={newComponent.options}
                                onChangeOptions={onChangeOptions}
                            />
                        </Grid2>
                    }
                </Grid2>
                <Grid2 container spacing={2} paddingY={2} paddingX={2} justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Grid2>
            </Box>
        </Modal>
    )
}

export default EditComponentModal;
