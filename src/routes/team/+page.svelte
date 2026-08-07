<script lang="ts">
  import Linktree from "$lib/components/linktree.svelte";
  import Panel from "$lib/components/panel.svelte";
  import Spacer from "$lib/components/spacer.svelte";

  type TeamMembers = {
    name: string;
    role: string;
    description: string;
    image: string;
    imageAlt: string;
    links: {
      label: string;
      url: string;
      icon: string;
      color: string;
    }[];
  }[];

  // Descriptions are blank, not sure if we are going to use them in the future yet

  const team: TeamMembers = [
    {
      name: "Zakarya",
      role: "Creative Director",
      description: "",
      image: "/img/zakarya-icon.webp",
      imageAlt: "Zakarya's Logo",
      links: [
        {
          label: "Website",
          url: "/zakarya",
          icon: "person-fill",
          color: "#2178ff",
        },
        {
          label: "Colormatic Git",
          url: "https://git.colormatic.org/zakarya",
          icon: "git",
          color: "#316996",
        },
      ],
    },
    {
      name: "SnailWeather",
      role: "Artist & Creator",
      description: "",
      image: "/img/snailweather.webp",
      imageAlt: "SnailWeather's Logo",
      links: [
        {
          label: "BlueSky",
          url: "https://bsky.app/profile/snailweather.bsky.social",
          icon: "bluesky",
          color: "#0085FF",
        },
        {
          label: "YouTube",
          url: "https://www.youtube.com/@SnailWeather",
          icon: "youtube",
          color: "#FF0031",
        },
      ],
    },
    {
      name: "Osprey",
      role: "Artist & Writer",
      description: "",
      image: "/img/osprey.webp",
      imageAlt: "Osprey's Logo",
      links: [
        {
          label: "Art Fight",
          url: "https://artfight.net/~OspreyRose",
          icon: "brush-fill",
          color: "#3c7e90",
        },
        {
          label: "YouTube",
          url: "https://www.youtube.com/@OspreyRose",
          icon: "youtube",
          color: "#FF0031",
        }
      ],
    }
  ];
</script>

<svelte:head>
  <title>Colormatic - Meet the Team</title>
  <meta
    name="description"
    content="Meet the people creating Colormatic and its projects."
  />
  <link rel="canonical" href="https://colormatic.org/team/" />

  <meta property="og:title" content="Colormatic - Meet the Team" />
  <meta
    property="og:description"
    content="Meet the people creating Colormatic and its projects."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org/team/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <section class="mx-auto w-[95%] pt-16 pb-5 text-center sm:w-[90%] lg:w-[70%]">
    <h1 class="text-4xl font-bold sm:text-5xl">Meet the Team</h1>
  </section>

  <section
    class="mx-auto grid w-[95%] max-w-5xl grid-cols-1 gap-5 sm:w-[90%] lg:grid-cols-2"
    aria-label="Colormatic team members"
  >
    {#each team as member}
      <article id={member.name.toLowerCase()}>
        <Panel class="flex h-full flex-col items-center p-7 text-center sm:p-9">
          <img
            class="h-32 w-32 rounded-full border-4 border-white/40 object-cover shadow-[1px_1px_8px_#00000055] dark:border-white/20"
            src={member.image}
            alt={member.imageAlt}
          />
          <h2 class="mt-5 text-3xl font-bold">{member.name}</h2>
          <p class="mt-1 text-lg font-semibold text-[#2178ff]">
            {member.role}
          </p>
          <p class="mt-5 max-w-md grow leading-relaxed">
            {member.description}
          </p>
          <Linktree class="mt-5 w-full max-w-sm" links={member.links} />
        </Panel>
      </article>
    {/each}
  </section>
</main>

<Spacer />
