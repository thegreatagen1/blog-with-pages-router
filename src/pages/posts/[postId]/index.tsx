import SubmitBtn from "@/components/SubmitBtn";
import { getPostComments } from "@/db/comments"
import { getPost, getPosts } from "@/db/posts"
import { getUser } from "@/db/users"
import { User } from "@prisma/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";

export default function PostPage({ post, user, comments, postId }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const [deleteLoading, setDeleteLoading] = useState(false)
    async function deleteHandler() {
        setDeleteLoading(true)
        await fetch(`/api/posts/${postId}/`, { method: 'DELETE' })
        router.push("/posts")
    }
    return (
        <>
            <h1 className="page-title">
                {post?.title}
                <div className="title-btns">
                    <Link className="btn btn-outline" href={`/posts/${postId}/edit`}>
                        Edit
                    </Link>
                    <SubmitBtn loading={deleteLoading} className="btn-outline btn-danger" onClick={deleteHandler} loadingText="Deleting">Delete</SubmitBtn>
                </div>
            </h1>
            <span className="page-subtitle">
                By: <Link href={`/users/${user?.id}`}>{user?.name}</Link>
            </span>
            <div>{post?.body}</div>

            <h3 className="mt-4 mb-2">Comments</h3>
            <div className="card-stack">
                {comments?.map(comment => (
                    <div key={comment.id} className="card">
                        <div className="card-body">
                            <div className="text-sm mb-1">{comment.email}</div>
                            {comment.body}
                        </div>
                    </div>
                ))}
            </div>
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
    const user = await getUser(post.userId) as User
    const comments = await getPostComments(postId)
    return {
        props: { post: post, user, comments, postId },
    }
}) satisfies GetStaticProps 
