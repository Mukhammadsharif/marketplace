/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '45.130.148.52',
                // port: '8000',
                pathname: '/**'
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;
