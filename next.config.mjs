/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "textures.minecraft.net"
            },
            {
                hostname: "www.mc-heads.net"
            },
            {
                hostname: "mc.nerothe.com"
            },
            {
                hostname: "crafatar.com"
            },
            {
                hostname: "sky.shiiyu.moe"
            },
        ]
    }
};

export default nextConfig;
