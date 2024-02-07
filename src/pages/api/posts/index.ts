import { createPost } from "@/db/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405)
    }
    const post = await createPost(req.body)
    return res.status(200).json(post)
}
