import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {SelectDropdownComponentInterface} from "../constants/Type.ts";
import Label from "./Label.tsx";

type SelectDropdownProps = {
    component: SelectDropdownComponentInterface;
    disabled: boolean;
}

function SelectDropdown(props: SelectDropdownProps) {
    const { component, disabled } = props
    const { label, value, options, required } = component

    return (
        <Box width="100%" minWidth={120} display="flex" flexDirection="row" justifyContent="center">
            <FormControl fullWidth style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Label label={label} required={required} />
                <Select
                    defaultValue={value}
                    fullWidth
                    slotProps={{
                        input: {
                            readOnly: disabled,
                        },
                    }}
                >
                    {options.map((option, index) => {
                        const { value, label } = option
                        return <MenuItem key={index} value={value}>{label}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectDropdown;
