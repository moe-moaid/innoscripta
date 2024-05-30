import { Article } from "../../types"
export const createArticle = ({ title, url, source, category, date, author, keywords, image, body }: Article) => ({
    title,
    url,
    source,
    category: category || 'general',
    date: new Date(date),
    author,
    keywords: keywords || null,
    image,
    body 
})