export interface FeaturedProject {
  title: string;
  link: string;
  description: string;
}

export interface StudioProject extends FeaturedProject {
  image: string;
  pixelArt: boolean;
}

export const homeFeaturedProjects: FeaturedProject[] = [
  {
    title: "Quality First Person Controller",
    link: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person",
    description: "An actually good first person controller for the Godot Engine.",
  },
  {
    title: "BSON for Godot",
    link: "https://git.colormatic.org/ColormaticStudios/godot-bson",
    description: "A BSON serializer/deserializer for the Godot Engine",
  },
];

export const studiosProjects: StudioProject[] = [
  {
    title: "Quality First Person Controller",
    link: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person",
    description: "An actually good first person controller for the Godot Engine.",
    image:
      "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person/raw/branch/main/icon.svg",
    pixelArt: false,
  },
  {
    title: "BSON for Godot",
    link: "https://git.colormatic.org/ColormaticStudios/godot-bson",
    description: "A BSON serializer/deserializer for the Godot Engine.",
    image: "https://git.colormatic.org/ColormaticStudios/godot-bson/raw/branch/main/icon.svg",
    pixelArt: false,
  },
  {
    title: "A Silly Game",
    link: "",
    description:
      "This is a silly little game project to get us started. Currently in closed pre-alpha.",
    image: "/img/studios/hatcat.webp",
    pixelArt: false,
  },
  {
    title: "ColorQuest",
    link: "",
    description:
      "A simple browser MMORPG focused on social features. Currently in closed pre-alpha.",
    image: "/img/studios/colorquest.png",
    pixelArt: true,
  },
];
