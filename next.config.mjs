/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ufarhfwnvrkiaxjhjrnl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // we do this to export our site as static site. If our app still contains some routes that
  // do something which results into dynamic rendering, then we will get error.
  // output: "export",
};

export default nextConfig;
