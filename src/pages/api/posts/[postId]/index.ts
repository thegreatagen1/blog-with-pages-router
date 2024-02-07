import { deletePost, updatePost } from "@/db/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        const post = await updatePost(req.query.postId as string, req.body)
        res.revalidate("/posts")
        res.revalidate(`/posts/${post.id}`)
        return res.status(200).json(post)
    }
    if (req.method === "DELETE") {
        await deletePost(req.query.postId as string)
        res.revalidate("/posts")
        return res.status(200).json({ message: "deleted successfully" })
    }
}
