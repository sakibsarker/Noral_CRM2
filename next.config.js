/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
// };






// /**
//  * @type {import('next').NextConfig}
//  **/
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   async redirects() {
//     return [
//       {
//         source: '/apps',
//         destination: '/apps/invoicing/invoice',
//         permanent: true,
//       },
//       {
//         source: '/apps/invoicing',
//         destination: '/apps/invoicing/invoice',
//         permanent: true,
//       },
//       {
//         source: '/components',
//         destination: '/components/base/accordion',
//         permanent: true,
//       },
//       {
//         source: '/components/base',
//         destination: '/components/base/accordion',
//         permanent: true,
//       },
//       {
//         source: '/components/buttons',
//         destination: '/components/buttons/buttons',
//         permanent: true,
//       },
//       {
//         source: '/components/forms',
//         destination: '/components/forms/form-control',
//         permanent: true,
//       },
//       {
//         source: '/components/icons',
//         destination: '/components/icons/free',
//         permanent: true,
//       },
//       {
//         source: '/components/notifications',
//         destination: '/components/notifications/alerts',
//         permanent: true,
//       },
//       {
//         source: '/plugins',
//         destination: '/plugins/calendar',
//         permanent: true,
//       },
//     ]
//   },
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
// }

// module.exports = nextConfig
