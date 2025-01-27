import React, {useContext} from "react";
import InputComponentDraggable, {InputComponentDraggableProps} from "./InputComponentDraggable.tsx";
import {Grid2, InputLabel} from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FormDataType, InputComponentType} from "../../constants/Type.ts";
import {FormPageContext} from "./FormPage.tsx";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { v4 as uuidv4 } from 'uuid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

const sampleComponentList: readonly InputComponentDraggableProps[] = [
    {
        icon: <InputIcon fontSize="large" color="primary" />,
        label: "Text Input",
        element: {
            type: InputComponentType.TEXT_INPUT,
            label: "Label",
            valuePlaceholder: null,
            value: null,
            required: false,
            minLength: null,
            maxLength: null,
            regex: null
        }
    },
    {
        icon: <CropLandscapeIcon fontSize="large" color="primary" />,
        label: "Textarea",
        element: {
            type: InputComponentType.TEXTAREA,
            label: "Label",
            valuePlaceholder: null,
            value: null,
            rows: 4,
            required: false,
            minLength: null,
            maxLength: null,
            regex: null
        }
    },
    {
        icon: <ArrowDropDownIcon fontSize="large" color="primary" />,
        label: "Select Dropdown",
        element: {
            type: InputComponentType.SELECT_DROPDOWN,
            label: "Label",
            valuePlaceholder: null,
            value: null,
            required: false,
            options: [
                {
                    id: uuidv4(), value: 0, label: "Option 1"
                },
                {
                    id: uuidv4(), value: 1, label: "Option 2"
                },
                {
                    id: uuidv4(), value: 2, label: "Option 3"
                }
            ]
        }
    },
    {
        icon: <CheckBoxIcon fontSize="large" color="primary" />,
        label: "Checkbox",
        element: {
            type: InputComponentType.CHECKBOX,
            label: "Label",
            value: null,
            required: false,
            options: [
                {
                    id: uuidv4(), value: 0, label: "Option 1"
                },
                {
                    id: uuidv4(), value: 1, label: "Option 2"
                },
                {
                    id: uuidv4(), value: 2, label: "Option 3"
                }
            ]
        }
    },
    {
        icon: <RadioButtonCheckedIcon fontSize="large" color="primary" />,
        label: "Radio Button",
        element: {
            type: InputComponentType.RADIO_BUTTON,
            label: "Label",
            value: null,
            required: false,
            options: [
                {
                    id: uuidv4(), value: 0, label: "Option 1"
                },
                {
                    id: uuidv4(), value: 1, label: "Option 2"
                },
                {
                    id: uuidv4(), value: 2, label: "Option 3"
                }
            ]
        }
    },
    {
        icon: <CalendarMonthIcon fontSize="large" color="primary" />,
        label: "Date Picker",
        element: {
            type: InputComponentType.DATE_PICKER,
            label: "Label",
            value: null,
            required: false,
        }
    },
    {
        icon: <CloudUploadIcon fontSize="large" color="primary" />,
        label: "File Upload",
        element: {
            type: InputComponentType.FILE_UPLOAD,
            label: "Label",
            value: null,
            required: false,
        }
    },
]

function SidePanel() {
    const {formList, currentForm, setCurrentForm} = useContext(FormPageContext)

    const handleChangeForm = (formId: string) => {
        if (!formList) {
            return
        }

        const newForm = formList.find(form => form.id == Number(formId))

        if (newForm) {
            setCurrentForm(newForm)
        }
    }

    const handleCreateNewForm = () => {
        const newForm: FormDataType =  {
            formName: "",
            formData: "[]"
        }
        setCurrentForm(newForm)
    }

    return (
        <React.Fragment>
            <FormControl fullWidth style={{ marginTop: 16, marginBottom: 16 }}>
                <InputLabel>Form</InputLabel>
                <Select
                    value={currentForm?.id}
                    label="Form"
                    onChange={(e) => handleChangeForm(String(e.target.value))}
                    fullWidth
                >
                    {formList && formList.map((form, index) => {
                        return (<MenuItem key={index} value={form.id}>{form.formName}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNewForm}
            >
                New form
            </Button>
            <Grid2 container width="100%" spacing={2} paddingY={2} paddingX={1}>
                {sampleComponentList.map((component) => {
                    const { icon, label, element } = component
                    return (
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <InputComponentDraggable icon={icon} label={label} element={element}/>
                        </Grid2>
                    )
                })}
            </Grid2>
        </React.Fragment>
    )
}

export default SidePanel;
