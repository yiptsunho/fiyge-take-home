import TextField from "@mui/material/TextField";
import {TextAreaComponentInterface} from "../constants/Type.ts";
import {Fragment} from "react";
import Label from "./Label.tsx";

type TextAreaProps = {
    component: TextAreaComponentInterface;
    disabled: boolean;
}

function Textarea(props: TextAreaProps) {
    const { component, disabled } = props
    const { label, valuePlaceholder, value, rows, required } = component

    return (
        <Fragment>
            <Label label={label} required={required} />
            <TextField
                variant="outlined"
                placeholder={valuePlaceholder !== null ? valuePlaceholder : undefined}
                value={value}
                rows={rows}
                multiline
                fullWidth
                slotProps={{
                    input: {
                        readOnly: disabled,
                    },
                }}
            />
        </Fragment>
    )
}

export default Textarea;
