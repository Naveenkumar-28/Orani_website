export type BlogType = {
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    commentsCount: number,
    formattedDate: string
}
export type RecendBlogPropsType = {
    blog: BlogType
}