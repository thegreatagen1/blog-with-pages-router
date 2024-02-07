import { EditForm } from "@/components/EditForm"
import { getPost, getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function EditPostPage({ post, users }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <h1 className="page-title">Edit Post</h1>
            <EditForm users={users!} post={post!} />
        </>
    )
}


export const getStaticPaths = (async () => {
    const posts = await getPosts()
    return {
        paths: posts.map(post => ({ params: { postId: post.id.toString() } })),
        fallback: "blocking",
    }
})

export const getStaticProps = (async ({ params }) => {
    const postId = params?.postId as string
    const post = await getPost(postId)
    if (!post) return { redirect: { destination: '/posts/not-found', permanent: false }, props: {} }
    const users = await getUsers()
    return {
        props: { post, users },
    }
}) satisfies GetStaticProps 
