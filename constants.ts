import type { AppInfo } from './types';

export const CURRENT_APP_ID = 'facebook-pixel';

export const OMEGA_APPS: AppInfo[] = [
  {
    id: 'facebook-pixel',
    name: 'Omega Facebook Pixel Meta Feed',
    description: 'Retargeting Ads Analytic: Facebook CAPI, Meta Pixel & Feed',
    logo: 'https://cdn.shopify.com/app-store/listing_images/74a0e40319bfc5a6f89d1e2217cf4281/icon/CM_H6Peko5ADEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#3b5998', // Facebook Blue
    isInstalled: true, 
  },
  {
    id: 'tikshop',
    name: 'TikShop: Omega Pixel & Catalog',
    description: 'Install multiple TikTok pixels, create server-side events, and sync product catalogs.',
    logo: 'https://cdn.shopify.com/app-store/listing_images/ba6b98a6f0321c296c7d9a18edecbfd1/icon/COyHmMfQrYoDEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#000000', // TikTok Black
    isInstalled: false,
  },
  {
    id: 'trakpilot',
    name: 'ᵗᵖ Google Ads, Ga4 & GTM',
    description: 'Real-time Google ads Tracking Pixels with Google Tag Manager',
    logo: 'https://cdn.shopify.com/app-store/listing_images/eef9eee73ebbd6637015f170216cebc6/icon/CO7KwpfQpowDEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#6A5ACD', // SlateBlue
    isInstalled: false,
  },
  {
    id: 'twitter-pixel',
    name: 'Omega Twitter Pixel Conversion',
    description: 'Boost your X Ad ROI with powerful X Pixel & X Conversion API',
    logo: 'https://cdn.shopify.com/app-store/listing_images/6e4df4bbba65c31b8086b1c1f13746c0/icon/CK_Qte-N6IIDEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#1DA1F2', // Twitter Blue
    isInstalled: true,
  },
  {
    id: 'pinterest-pixels',
    name: 'Omega - Multi Pinterest Pixels',
    description: 'Skyrocket your Ads with Multi Pinterest Tags & Conversion API',
    logo: 'https://cdn.shopify.com/app-store/listing_images/63426c3192e8bf64b5aa5660f3eda9a9/icon/CIXW2vGN6IIDEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#E60023', // Pinterest Red
    isInstalled: true,
  },
  {
    id: 'snapchat-pixel',
    name: 'Omega Snapchat Pixel',
    description: 'Rev up Snapchat ad with powerful Snap Pixels & CAPI in a snap',
    logo: 'https://cdn.shopify.com/app-store/listing_images/cb750df4030cd0b2de17012b1dcf8acb/icon/CInRnPON6IIDEAE=.png?height=72&width=72',
    appStoreUrl: '#',
    color: '#FFFC00', // Snapchat Yellow
    isInstalled: false,
  },
];
