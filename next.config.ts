import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl) : null;

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['three', 'mui-tel-input', "@mui/material-nextjs"],
    images: {
        remotePatterns: supabaseOrigin
            ? [
                {
                    protocol: supabaseOrigin.protocol.replace(':', '') as 'http' | 'https',
                    hostname: supabaseOrigin.hostname,
                    port: supabaseOrigin.port,
                    pathname: '/storage/v1/object/public/configs/**',
                    search: '',
                },
                {
                    protocol: supabaseOrigin.protocol.replace(':', '') as 'http' | 'https',
                    hostname: supabaseOrigin.hostname,
                    port: supabaseOrigin.port,
                    pathname: '/storage/v1/object/public/scans/**',
                    search: '',
                },
            ]
            : [],
    },
};

export default nextConfig;
