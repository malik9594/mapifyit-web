export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  metaDescription: string;
  ogTitle?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "mapifyit-maps-gis-enterprise-alternative",
    title: "MapifyIt Maps & GIS: The Complete Enterprise Alternative to Google Maps, Mapbox, and Traditional GIS Platforms",
    excerpt: "Location is no longer just a feature—it’s infrastructure. From logistics and ride-hailing to delivery, fintech, and smart cities, modern applications depend heavily on mapping APIs.",
    category: "Industry Insights",
    date: "April 28, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["GIS", "Mapping", "Enterprise", "Google Maps Alternative"],
    metaDescription: "MapifyIt is a full-stack mapping and GIS platform — the complete enterprise alternative to Google Maps, Mapbox, and Esri.",
    ogTitle: "MapifyIt Maps & GIS: The Complete Enterprise Alternative to Google Maps & Mapbox",
  },
  {
    slug: "what-is-mapifyit-full-stack-gis-platform",
    title: "What is MapifyIt? The Full-Stack Mapping & GIS Platform",
    excerpt: "MapifyIt is designed for businesses that want to build, scale, and control their own geospatial infrastructure without relying on expensive third-party APIs.",
    category: "Product Overview",
    date: "April 27, 2026",
    readTime: "6 min read",
    featured: false,
    tags: ["GIS", "Mapping", "Infrastructure", "Product"],
    metaDescription: "Discover MapifyIt, a full-stack mapping platform combining APIs, GIS intelligence, and real-time location systems for enterprise scale.",
  },
  {
    slug: "mapifyit-vs-google-maps-mapbox-esri",
    title: "A Detailed Comparison: MapifyIt vs Google Maps, Mapbox, and Esri",
    excerpt: "This is where things become clear. We compare cost structures, deployment options, customization levels, and data ownership across the top mapping platforms.",
    category: "Comparison",
    date: "April 26, 2026",
    readTime: "10 min read",
    featured: false,
    tags: ["Google Maps", "Mapbox", "Esri", "Comparison"],
    metaDescription: "Compare MapifyIt with industry giants. Understand the differences in pricing models, deployment, and customization.",
  },
  {
    slug: "real-world-use-cases-logistics-ride-hailing-smart-cities",
    title: "Real-World Use Cases: Powering Critical Infrastructure Across Industries",
    excerpt: "From logistics and ride-hailing to delivery, fintech, and smart cities, see how MapifyIt is being used to build scalable location intelligence systems.",
    category: "Use Cases",
    date: "April 25, 2026",
    readTime: "7 min read",
    featured: false,
    tags: ["Logistics", "Smart Cities", "Fintech", "Mobility"],
    metaDescription: "Explore real-world examples of MapifyIt in action across various industries like logistics, agriculture, and urban planning.",
  },
  {
    slug: "high-performance-map-rendering-vector-tiles",
    title: "High-Performance Map Rendering: The Power of Vector Tiles",
    excerpt: "How MapifyIt uses optimized vector tiles to deliver fast, smooth maps across mobile and web applications, even with massive datasets.",
    category: "Engineering",
    date: "April 24, 2026",
    readTime: "5 min read",
    featured: false,
    tags: ["Rendering", "Vector Tiles", "Performance", "Web Graphics"],
    metaDescription: "Deep dive into the rendering engine of MapifyIt and how it handles high-frequency map loads with ease.",
  },
  {
    slug: "enterprise-security-privacy-on-premise-deployment",
    title: "Enterprise Security & Privacy: Why On-Premise Matters",
    excerpt: "For government and financial institutions, data sovereignty is non-negotiable. Learn how MapifyIt supports air-gapped and private infrastructure.",
    category: "Security",
    date: "April 23, 2026",
    readTime: "6 min read",
    featured: false,
    tags: ["Security", "Privacy", "On-Premise", "Compliance"],
    metaDescription: "Explore the security features of MapifyIt, including on-premise deployment and strict data compliance for enterprises.",
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
