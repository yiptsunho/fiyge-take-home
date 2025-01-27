import {useState} from "react";

function usePreviewModal() {
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)

    const openPreviewModal = () => {
        setShowPreviewModal(true)
    }
    const closePreviewModal = () => {
        setShowPreviewModal(false)
    }

    return {
        showPreviewModal,
        openPreviewModal,
        closePreviewModal
    }
}

export default usePreviewModal;
