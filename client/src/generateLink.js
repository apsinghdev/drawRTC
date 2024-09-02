import {v4 as uuidv4} from "uuid";

const generateCollabLink = () => {
    const uniqueId = uuidv4();
    const link = `http://localhost:5173/?roomID=${uniqueId}`;
    return link;
}

const redirectToCollabLink = () => {
    const link = generateCollabLink();
    window.location.replace(link);
};

export default redirectToCollabLink;