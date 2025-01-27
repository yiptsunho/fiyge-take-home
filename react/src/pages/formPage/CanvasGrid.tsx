import {useContext} from "react";
import {Grid2} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useDrop} from "react-dnd"
import {InputComponentType} from "../../constants/InputComponentType.ts";
import {FormPageContext} from "./FormPage.tsx";
import TextInput from "../../components/TextInput.tsx";
import Textarea from "../../components/Textarea.tsx";
import SelectDropdown from "../../components/SelectDropdown.tsx";
import CustomCheckbox from "../../components/CustomCheckbox.tsx";
import RadioButton from "../../components/RadioButton.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import FileUpload from "../../components/FileUpload.tsx";
import {
    CheckboxComponentInterface, DatePickerComponentInterface, FileUploadComponentInterface,
    GenericInputComponentType, RadioButtonComponentInterface, SelectDropdownComponentInterface,
    TextAreaComponentInterface,
    TextInputComponentInterface
} from "../../constants/Type.ts";
import Box from "@mui/material/Box";

type CanvasGridProps = {
    index: number;
    component: GenericInputComponentType | null;
    onClickEditComponent: (index: number, component: GenericInputComponentType) => void;
    preview: boolean
}

function CanvasGrid(props: CanvasGridProps) {
    const { index, component, onClickEditComponent, preview } = props
    const { onDrop } = useContext(FormPageContext)
    const allowEditComponent = !preview

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: InputComponentType.ALL,
        drop: (item) => onDrop(index, item as GenericInputComponentType),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const renderComponent = () => {
        if (component === null) {
            return <></>
        }

        switch (component.type) {
            case InputComponentType.TEXT_INPUT:
                return <TextInput key={index} component={component as TextInputComponentInterface} disabled={!preview}/>
            case InputComponentType.TEXTAREA:
                return <Textarea key={index} component={component as TextAreaComponentInterface} disabled={!preview} />
            case InputComponentType.SELECT_DROPDOWN:
                return <SelectDropdown key={index} component={component as SelectDropdownComponentInterface} disabled={!preview} />
            case InputComponentType.CHECKBOX:
                return <CustomCheckbox key={index} component={component as CheckboxComponentInterface} disabled={!preview} />
            case InputComponentType.RADIO_BUTTON:
                return <RadioButton key={index} component={component as RadioButtonComponentInterface} disabled={!preview} />
            case InputComponentType.DATE_PICKER:
                return <CustomDatePicker key={index} component={component as DatePickerComponentInterface} disabled={!preview} />
            case InputComponentType.FILE_UPLOAD:
                return <FileUpload key={index} component={component as FileUploadComponentInterface} disabled={!preview} />
            default:
                return <></>
        }
    }

    return (
        <Grid2
            size={{ xs: 12, md: 6 }}
            height={component !== null ? undefined : "90px"}
            display="flex"
            alignItems="center"
            justifyContent={component !== null ? "start" : "center"}
            borderRadius="10px"
            border={component !== null ? undefined : "1px dashed grey"}
            ref={drop}
        >
            {component !== null ?
                <Box
                    onClick={() => allowEditComponent && onClickEditComponent(index, component)}
                    style={{
                        cursor: `${allowEditComponent && "pointer"}`,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    {renderComponent()}
                </Box>
                :
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <AddCircleIcon fontSize="large" />
                    {canDrop && "Drop here"}
                    {/*Drop here*/}
                </Box>
        }
        </Grid2>
    )
}

export default CanvasGrid;
