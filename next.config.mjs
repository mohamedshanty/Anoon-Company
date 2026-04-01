import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Performance: remove console.log in production ──────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  experimental: {
    // Inline critical CSS to eliminate render-blocking stylesheets
    optimizeCss: true,
    // Tree-shake specific heavy packages to reduce bundle size
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@tanstack/react-query",
      "gsap",
      "@tiptap/react",
      "@tiptap/starter-kit",
      "@tiptap/core",
      "swiper",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Serve AVIF first (smaller), then WebP
    formats: ["image/avif", "image/webp"],
    // Optimized device sizes to reduce generated variants
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Minimize quality for background/decorative images
    minimumCacheTTL: 31536000,
  },

  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,

  // ── Turbopack Compatibility ────────────────────────────────────────────────
  turbopack: {},

  // ── Webpack splitChunks for optimal code splitting ─────────────────────────
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 60000, // Force chunks under 60KB to avoid long tasks
        cacheGroups: {
          // React core — cached separately, rarely changes
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: "react-vendor",
            priority: 40,
            reuseExistingChunk: true,
          },
          // Animation libs (GSAP, framer-motion) — heavy, deferred
          animations: {
            test: /[\\/]node_modules[\\/](gsap|@gsap|framer-motion)[\\/]/,
            name: "animations-vendor",
            priority: 35,
            reuseExistingChunk: true,
          },
          // Swiper — only loaded when Teams section is visible
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: "swiper-vendor",
            priority: 35,
            reuseExistingChunk: true,
          },
          // i18n — loaded once, cached for all pages
          i18n: {
            test: /[\\/]node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/,
            name: "i18n-vendor",
            priority: 30,
            reuseExistingChunk: true,
          },
          // All other vendor code
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
          },
          // Shared app code used across 2+ chunks
          common: {
            minChunks: 2,
            priority: 5,
            name: "common",
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        // Static assets — immutable long cache (JS/CSS chunks with hashes)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Optimized images from next/image
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Public images and fonts — long cache with revalidation
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // HTML pages — bfcache-compatible (no no-store)
        source: "/((?!_next|images|api).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
