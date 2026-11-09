import type { SiteContent } from "./site-content";
import { shopLayerFaq } from "./shoplayer-faq";

export const englishSiteContent: SiteContent = {
  meta: {
    title: "ShopLayer | AI Optimization for Commerce",
    description: "ShopLayer is an AI commerce agent that optimizes store, product and image data, with human review and product feed management across six marketing channels.",
  },
  nav: {
    items: [
      { id: "trend", label: "Shopping" }, { id: "platforms", label: "Trends" },
      { id: "cases", label: "AI commerce" }, { id: "definition", label: "ShopLayer" },
      { id: "features", label: "Features" }, { id: "feed", label: "Feeds" },
      { id: "faq", label: "FAQ" }, { id: "closing", label: "Contact" },
    ],
    languageLabel: "Language", contactLabel: "Apply for ShopLayer",
  },
  hero: {
    eyebrow: "SHOPLAYER · COMMERCE AI AGENT",
    title: "ShopLayer is your AI commerce optimization agent.",
    description: "ShopLayer analyzes your store and product information and organizes it so AI can understand it. People review the evidence and approve improvements. Product data from a single feed is then prepared and updated for multiple marketing channels.",
    serviceNote: "ShopLayer · AI optimization for commerce",
    primaryLabel: "Apply for ShopLayer", secondaryLabel: "", visualLabel: "AI shopping experience",
    visualSteps: ["Shopping question", "Product comparison", "Product cards"], visualNote: "",
  },
  trend: {
    eyebrow: "THE SHIFT", title: "Even a short search has a shopping context.",
    description: "Shoppers still search by product name. AI shopping adds preferences, budgets and situations from earlier conversations to the comparison. The right pair of beige trousers depends on who needs them and when. That makes accurate data about materials, fit, color and use more valuable.",
    beforeLabel: "A short search", beforeExample: "Search for “beige trousers” and browse the results.",
    afterLabel: "Discovery with context",
    afterExample: "AI brings together product descriptions, images, prices and reviews to suggest products that fit the shopper’s needs and preferences.",
    conclusion: "ShopLayer makes the information AI uses to compare and recommend products more accurate and complete.",
  },
  platforms: {
    eyebrow: "MARKET SIGNALS", title: "Google and NAVER are changing product discovery.",
    description: "Conversational shopping is expanding the role of product data. These announcements show why accurate commerce information matters, within the dates and scope each company described.",
    cards: [
      { id: "google-ai-mode", title: "Google Search AI Mode", date: "Announced Nov 13, 2025",
        scope: "Conversational shopping · Some purchase features were limited to eligible US retailers at announcement",
        description: "Google introduced a shopping experience that helps people compare products using natural language, with images, prices, reviews and availability in one place.",
        sourceLabel: "Google announcement", sourceUrl: "https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/" },
      { id: "google-merchant-center", title: "Google Merchant Center", date: "Announced Jan 11, 2026",
        scope: "New product attributes · A phased rollout starting with a small group of retailers was planned",
        description: "Google announced attributes for conversational discovery, including answers to common product questions, compatible accessories and alternatives alongside standard product data.",
        sourceLabel: "Google announcement", sourceUrl: "https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/" },
      { id: "naver-shopping-agent", title: "NAVER Shopping AI Agent", date: "Beta announced Feb 26, 2026",
        scope: "NAVER Plus Store app in Korea · Initially focused on digital, home and everyday goods",
        description: "NAVER introduced a beta that supports discovery through product summaries, comparisons and review analysis, with plans to expand categories and features gradually.",
        sourceLabel: "NAVER press release", sourceUrl: "https://navercorp.com/media/pressReleasesDetail?seq=34353" },
    ], note: "",
  },
  cases: {
    eyebrow: "AI COMMERCE IN PRACTICE", title: "Retailers are responding to AI commerce around the world.",
    description: "AI discovery and recommendations are becoming part of everyday shopping. Explore reported examples from Korea, Japan and the US, with their measured changes and comparison limits.",
    disclaimer: "Press coverage · Figures follow each article", cards: [],
  },
  definition: {
    eyebrow: "WHAT SHOPLAYER DOES", title: "ShopLayer analyzes and improves store, product and image data.",
    description: "ShopLayer examines search accessibility, brand messaging, product details and image information together. People review the analysis and AI suggestions to improve information quality. Product feeds are managed in the format each channel requires.",
    flowLabel: "From analysis to multi-channel operations",
    flows: [
      { id: "selected-optimization", title: "Understand and improve your store and products", description: "Analyze public store information and selected products and images to compare what AI understands with your brand’s intent.", steps: ["Register store URL and details", "Review structure and brand", "Analyze products and images", "Review and approve"], result: "Save approved product information with its evidence in ShopLayer and use it to support store improvements.", note: "" },
      { id: "catalog-feed", title: "Expand channel operations from one feed", description: "Sync a catalog from one product feed link and prepare shared product information for each marketing channel.", steps: ["Connect a product feed", "Collect and organize data", "Generate six channel feeds", "Schedule updates and review status"], result: "Manage published products, update status and error history in one place.", note: "" },
    ], exampleLabel: "", exampleStages: [],
  },
  features: {
    eyebrow: "CAPABILITIES", title: "Turn your store and product images into useful data.",
    description: "ShopLayer analyzes your store and products. See how evidence reviewed and approved by people supports improvements to your commerce data.",
    labels: { input: "Input", work: "ShopLayer analysis", result: "Outcome", planned: "Extensions" },
    cards: [
      { id: "store", number: "01", title: "Store optimization", status: "Site diagnosis", input: "Store URL and basic brand information", work: "Check public-page metadata, structured data, robots.txt and sitemaps, and compare the brand AI understands with your intended positioning.", result: "Identify gaps in search accessibility and brand communication, with evidence and priorities for improvement." },
      { id: "product", number: "02", title: "Product optimization", status: "Product information", input: "Store, category or product URLs to scope the analysis, plus product details", work: "Review selected product details, images and variants, extract verified facts, and suggest improvements to titles, descriptions and search wording.", result: "Save reviewed and approved information by version in ShopLayer for use in store improvements and channel feed optimization after review." },
      { id: "image", number: "03", title: "Image information", status: "Image analysis", input: "Selected main, additional, variant and detail images", work: "Examine visible colors, shapes, text and product features to suggest ALT text and product attributes. Review long detail images section by section.", result: "Keep approved ALT text and image features as evidence for better product information." },
      { id: "feed", number: "04", title: "Unified feed optimization", status: "Multi-channel operations", input: "One product feed link and selected categories and channels", work: "Collect and organize product data, then generate and update feeds for GPT Ads, Google, NAVER, Meta, TikTok and Kakao.", result: "Manage published products, hosted URLs, schedules and error history in one view." },
      { id: "report", number: "05", title: "Reports and analysis", status: "Operational insights", input: "Site diagnosis, product collection and channel feed run data", work: "Bring together store diagnostics, new and changed products, and published, excluded or failed feed items.", result: "Use status and history to identify products that need attention and prioritize the next improvements." },
      { id: "operations", number: "06", title: "Operations management", status: "Workflow", input: "Store diagnostics, approved products and channel schedules", work: "The ShopLayer team manages analysis scope, review and approval, prompt versions, collection and publication schedules in one workflow.", result: "Track source changes, progress, scheduled updates and failure handling to support reliable recurring work." },
    ],
  },
  feed: {
    eyebrow: "UNIFIED FEED MANAGER", title: "One product feed. Multiple marketing channels.",
    description: "Connect one product feed link. ShopLayer collects and organizes your product data and generates feeds for GPT Ads, Google, NAVER, Meta, TikTok and Kakao. Update new and changed products on schedule and manage publication status and errors in one place.",
    sourceLabel: "One product feed link", sourceDescription: "Organize IDs, names, prices, availability and images into shared product data. Add details from public product pages and apply approved optimizations according to channel requirements.",
    lifecycleLabel: "Connect once. Manage each channel.",
    steps: [
      { number: "01", title: "Connect your feed", description: "Collect your catalog from a single feed link and organize shared product data." },
      { number: "02", title: "Generate channel feeds", description: "Validate and generate all products or selected categories for each channel." },
      { number: "03", title: "Scheduled updates", description: "Set collection and publication schedules to keep product information up to date." },
      { number: "04", title: "Track changes", description: "Compare new products and changes in price, stock and descriptions, with collection, generation and error history." },
    ],
    channelsLabel: "Shared data. Six channels.",
    channels: [
      { id: "gpt", name: "GPT Ads", description: "GPT Ads product feed" }, { id: "naver", name: "NAVER Shopping", description: "NAVER Shopping EP" },
      { id: "google", name: "Google Merchant", description: "Google product feed" }, { id: "meta", name: "Meta Catalog", description: "Meta product catalog" },
      { id: "tiktok", name: "TikTok Catalog", description: "TikTok product catalog" }, { id: "kakao", name: "Kakao Moment", description: "Kakao product feed" },
    ],
    outputLabel: "Channel operations at a glance", outputDescription: "Review published products, hosted URLs, recent updates, exclusions and errors in one place.",
    boundaryLabel: "Schedules that keep up with changes", boundaryDescription: "Identify changes in source data and update channel feeds at the scheduled time.",
  },
  faq: { eyebrow: "FAQ", title: "ShopLayer frequently asked questions", description: "Learn how optimization, feed operations, human review, campaigns and monitoring work together.", items: shopLayerFaq.en },
  closing: {
    eyebrow: "SHOPLAYER · THE NEXT COMMERCE DATA", title: "Better AI shopping starts with better product data.",
    description: "From store diagnostics and product information to multi-channel feeds, build commerce data that both your customers and AI can understand with ShopLayer.", contactStatus: "", note: "",
  },
  footer: { description: "ShopLayer combines AI and human review to optimize commerce data and support operations across marketing platforms." },
};
