export const fetchRequest = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

export default fetchRequest;
