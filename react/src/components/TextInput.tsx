import TextField from "@mui/material/TextField";
import {TextInputComponentInterface} from "../constants/Type.ts";
import {Fragment} from "react";
import Label from "./Label.tsx";

type TextInputProps = {
    component: TextInputComponentInterface;
    disabled: boolean;
}

function TextInput(props: TextInputProps) {
    const { component, disabled } = props
    const { label, valuePlaceholder, value, required } = component

    return (
        <Fragment>
            <Label label={label} required={required} />
            <TextField
                variant="outlined"
                placeholder={valuePlaceholder !== null ? valuePlaceholder : undefined}
                value={value}
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

export default TextInput;
