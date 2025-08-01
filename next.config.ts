import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['three', 'mui-tel-input', "@mui/material-nextjs"],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dggrbfhwlvvsxbhnobig.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/configs/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'dggrbfhwlvvsxbhnobig.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/scans/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
