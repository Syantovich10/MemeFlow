import { YouTubeVideo } from "@/components/Layout/YoutubeVideo/YoutubeVideo";
import { Modal } from "@/components/UI/Modal/Modal";

const YoutubeVideoModal = () => {
    return (
        <Modal>
            <YouTubeVideo embedded />
        </Modal>
    )
}

export default YoutubeVideoModal;
