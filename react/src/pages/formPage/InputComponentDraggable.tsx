import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import {useDrag} from "react-dnd";
import {InputComponentType} from "../../constants/InputComponentType.ts";
import {ReactNode} from "react";
import {GenericInputComponentType} from "../../constants/Type.ts";

export type InputComponentDraggableProps = {
    icon: ReactNode;
    label: string;
    element: GenericInputComponentType;
}

function InputComponentDraggable(props: InputComponentDraggableProps) {
    const { icon, label, element } = props
    const [{isDragging}, drag] = useDrag(() => ({
        type: InputComponentType.ALL,
        item: element,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <Paper elevation={3} sx={{ width: "100%", aspectRatio: 1 }} ref={drag}>
            <Box display="flex" flexDirection="column" height="100%" alignItems="center" justifyContent="space-evenly">
                {icon}
                {label}
            </Box>
        </Paper>
    )
}

export default InputComponentDraggable;
