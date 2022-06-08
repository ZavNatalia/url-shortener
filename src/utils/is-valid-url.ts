export const isValidURL = (link: string) => {
    let url_string;
    try {
        url_string = new URL(link);
    } catch (_) {
        return false;
    }
    return url_string.protocol === "http:" || url_string.protocol === "https:" ;
};
