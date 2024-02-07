/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/posts",
                permanent: false 
            }
        ]
    }
} 

module.exports = nextConfig
