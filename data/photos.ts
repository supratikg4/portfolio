export interface Photo {
  id: number;
  url: string;
  aspect: "portrait" | "landscape";
  alt: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    url: "/photography/franklin_night.JPG",
    aspect: "portrait",
    alt: "Portrait photograph",
  },
  {
    id: 2,
    url: "/photography/yash_sitting.JPG",
    aspect: "landscape",
    alt: "Landscape photograph",
  },
  {
    id: 3,
    url: "/photography/carli_latta.JPG",
    aspect: "portrait",
    alt: "Portrait photograph",
  },
  {
    id: 4,
    url: "/photography/boys_silhouettes.jpg",
    aspect: "portrait",
    alt: "Portrait photograph",
  },
  {
    id: 5,
    url: "/photography/carli_water_splash.jpg",
    aspect: "landscape",
    alt: "Landscape photograph",
  },
  {
    id: 6,
    url: "/photography/sophie_times_square.JPG",
    aspect: "portrait",
    alt: "Portrait photograph",
  },
  {
    id: 7,
    url: "/photography/zoe_side_garage.JPG", 
    aspect: "portrait",
    alt: "Portrait photograph",
  },
  {
    id: 8,
    url: "/photography/grandfather_trees.JPG",
    aspect: "landscape",
    alt: "Landscape photograph",
  },
];
