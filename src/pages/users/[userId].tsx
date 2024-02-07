import { PostCard } from "@/components/PostCard"
import { TodoItem } from "@/components/TodoItem"
import { getUserPosts } from "@/db/posts"
import { getUserTodos } from "@/db/todos"
import { getUser, getUsers } from "@/db/users"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function UserPage({ user, posts, todos }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <h1 className="page-title">{user?.name}</h1>
            <div className="page-subtitle">{user?.email}</div>
            <div>
                <b>Company:</b> {user?.companyName}
            </div>
            <div>
                <b>Website:</b> {user?.website}
            </div>
            <div>
                <b>Address:</b>{" "}
                {`${user?.street} ${user?.suite}
    ${user?.city} ${user?.zipcode}`}
            </div>

            <h3 className="mt-4 mb-2">Posts</h3>
            <div className="card-grid">
                {posts?.map(post => (
                    <PostCard key={post.id} {...post} />
                ))}
            </div>

            <h3 className="mt-4 mb-2">Todos</h3>
            <ul>
                {todos?.map(todo => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    )
}

export const getStaticPaths = (async () => {
    const users = await getUsers()
    return {
        paths: users.map(user => ({ params: { userId: user.id.toString() } })),
        fallback: "blocking",
    }
})

export const getStaticProps = (async ({ params }) => {
    const userId = params?.userId as string
    const user = await getUser(userId)
    if (!user) return { redirect: { destination: '/users/not-found', permanent: false }, props: {} }
    const posts = await getUserPosts(userId)
    const todos = await getUserTodos(userId)
    return {
        props: { user, posts, todos },
    }
}) satisfies GetStaticProps 
