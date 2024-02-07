import { Post, User } from "@prisma/client"
import { FormGroup } from "./FormGroup"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import SubmitBtn from "./SubmitBtn"

type Props = {
    post: Post
    users: User[]
}

export function EditForm({ post, users }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    async function formHandler(e: FormEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        setLoading(true)
        await fetch(`/api/posts/${post.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: formData.get("title"),
                body: formData.get("body"),
                userId: Number(formData.get("userId")),
            })
        }).then(res => res.json()) as Post
        router.push(`/posts/${post.id}`)
    }
    return (
        <form onSubmit={formHandler} className="form">
            <div className="form-row">
                <FormGroup>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        defaultValue={post?.title}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="userId">Author</label>
                    <select
                        required
                        name="userId"
                        id="userId"
                        defaultValue={post?.userId}
                    >
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
            </div>
            <div className="form-row">
                <FormGroup>
                    <label htmlFor="body">Body</label>
                    <textarea required name="body" id="body" defaultValue={post?.body} />
                </FormGroup>
            </div>
            <div className="form-row form-btn-row">
                <Link
                    className="btn btn-outline"
                    href={post ? `/posts/${post.id}` : "/posts"}
                >
                    Cancel
                </Link>
                <SubmitBtn loading={loading} />
            </div>
        </form>
    )
}
