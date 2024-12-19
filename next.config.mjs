import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ryankwan.netlify.app',
            },
        ],
    },
};

export default nextConfig;
