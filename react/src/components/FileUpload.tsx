import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FileUploadComponentInterface} from "../constants/Type.ts";
import {Fragment} from "react";
import Label from "./Label.tsx";

type FileUploadProps = {
    component: FileUploadComponentInterface;
    disabled: boolean;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function FileUpload(props: FileUploadProps) {
    const { component, disabled } = props
    const { label, value, required } = component

    return (
        <Fragment>
            <Label label={label} required={required} />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={disabled}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                    value={typeof value == "string" ? value : undefined}
                />
            </Button>
        </Fragment>
    )
}

export default FileUpload;
