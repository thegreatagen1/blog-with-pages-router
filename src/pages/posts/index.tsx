import { FormGroup } from "@/components/FormGroup"
import { PostCard } from "@/components/PostCard"
import { getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { User } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"

export default function PostsPage({ posts, users }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <h1 className="page-title">
                Posts
                <div className="title-btns">
                    <Link className="btn btn-outline" href="posts/new">
                        New
                    </Link>
                </div>
            </h1>

            <SearchForm users={users} />

            <div className="card-grid">
                {posts.map(post => (
                    <PostCard key={post.id} {...post} />
                ))}
            </div>
        </>
    )
}

export const getServerSideProps = (async ({ query }) => {
    const posts = await getPosts(query)
    const users = await getUsers()
    return {
        props: { posts, users },
    }
}) satisfies GetServerSideProps

function SearchForm({ users }: { users: User[] }) {
    const router = useRouter()
    const query = router.query.query
    const userId = router.query.userId
    const queryRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLSelectElement>(null)


    return (
        <form className="form mb-4">
            <div className="form-row">
                <FormGroup>
                    <label htmlFor="query">Query</label>
                    <input
                        type="search"
                        name="query"
                        id="query"
                        defaultValue={query}
                        ref={queryRef}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="userId">Author</label>
                    <select name="userId" id="userId" ref={userRef}>
                        <option value="">Any</option>
                        {users.map(user => (
                            <option selected={user.id === Number(userId)} key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <button className="btn">filter</button>
            </div>
        </form>
    )
}
