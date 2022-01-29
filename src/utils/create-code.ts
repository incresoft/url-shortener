import shortid from "shortid";

export default function (): string {
    return shortid.generate();
};