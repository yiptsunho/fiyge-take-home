import {useState} from "react";

function useEditComponentModal() {
    const [showEditComponentModal, setShowEditComponentModal] = useState<boolean>(false)

    const openEditComponentModal = () => {
        setShowEditComponentModal(true)
    }
    const closeEditComponentModal = () => {
        setShowEditComponentModal(false)
    }

    return {
        showEditComponentModal,
        openEditComponentModal,
        closeEditComponentModal
    }
}

export default useEditComponentModal;
