import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Grid2, Paper} from "@mui/material";
import React, {useContext, useMemo} from "react";
import {FormPageContext} from "./FormPage.tsx";
import CanvasGrid from "./CanvasGrid.tsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PreviewModalProps = {
    open: boolean;
    handleClose: () => void;
}

function PreviewModal(props: PreviewModalProps) {
    const {open, handleClose} = props;
    const {componentList} = useContext(FormPageContext)

    const componentListFilteredNull = useMemo(() => {
        return componentList.filter(component => component !== null)
    }, [componentList])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style} component={Paper}>
                <Grid2 container spacing={2} paddingY={2} paddingX={2}>
                    {componentListFilteredNull.map((component, index) => {
                        return <CanvasGrid key={index} index={index} component={component} onClickEditComponent={() => {}} preview={true}/>
                    })}
                </Grid2>
            </Box>
        </Modal>
    )
}

export default PreviewModal;
