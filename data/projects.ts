export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "RaceRouter",
    category: "Full-Stack & Cloud",
    description:
      "Developing a web platform that automates race transport planning logistics to reduce manual officer work from 4 hours to under 10 minutes. Implemented GCP authentication and managed end-to-end data lifecycle through Google APIs. Incorporating a RAG-based LLM to explain optimization decisions.",
    tech: ["React", "Next.js", "TypeScript", "Python", "GCP", "RAG"],
    link: "#",
    image:
      "/projects/racerouter_image.png",
  },
  {
    id: 2,
    title: "WolfCafe",
    category: "Software Engineering",
    description:
      "Engineered a full-stack web ordering platform in an Agile environment. Developed backend services and REST APIs, collaborating through Git version control and CI/CD pipelines. Designed SQL relational database schemas to ensure data integrity and security.",
    tech: ["Spring Boot", "Angular", "Node.js", "SQL", "REST APIs", "CI/CD"],
    link: "#",
    image:
      "/projects/home_screen.png",
  },
  {
    id: 3,
    title: "Transit Planner",
    category: "Optimization & Algorithms",
    description:
      "Developed a multithreaded genetic algorithm-based optimizer in Python for public transit network design. Modeled competing design objectives using a multifactor cost function incorporating population density and traffic. Achieved a 10% improvement in simulated traffic flow over the existing Manhattan layout.",
    tech: ["Python", "Multi-threading", "Optimization", "OpenStreetMap"],
    link: "#",
    image:
      "/projects/extra_1_high.png",
  },
  {
    id: 4,
    title: "Sketch-to-Image GAN",
    category: "Machine Learning",
    description:
      "Implemented the pix2pix conditional GAN paper in PyTorch, TensorFlow, and Keras using U-Net generator and PatchGAN discriminator to synthesize realistic images from sparse human sketches. Improved image generation quality by 5%.",
    tech: ["PyTorch", "TensorFlow", "Keras", "GANs", "Computer Vision"],
    link: "#",
    image:
      "/projects/sketchygan_image.png",
  },
  {
    id: 5,
    title: "Spotify Trends Analysis",
    category: "Data Science",
    description:
      "Analyzed 150,000+ song datasets using R, employing classification and clustering machine learning models to generate insights into complex relationships influencing song popularity. Presented findings through ggplot visualizations.",
    tech: ["R", "NLP", "Machine Learning", "Statistical Analysis"],
    link: "#",
    image:
      "/projects/racerouter_image.png",
  },
];
