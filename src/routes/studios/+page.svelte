<script lang="ts">
  import Panel from "components/panel.svelte";
  import Hero from "components/hero.svelte";
  import Spacer from "components/spacer.svelte";
  import Linktree from "components/linktree.svelte";
  import { getContext } from "svelte";

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<svelte:head>
  <title>Colormatic Studios</title>
  <meta
    name="description"
    content="Colormatic Studios is a creative studio dedicated to giving life to
    Colormatic's projects. We are currently just a small group of passionate
    volunteers working to build inspiring, intuitive and innovative creative
    works."
  />
  <meta
    name="keywords"
    content="Open Source, Not for Profit, Game Development, World Building"
  />
  <link rel="canonical" href="https://colormatic.org/studios/" />

  <meta property="og:title" content="Colormatic Studios" />
  <meta
    property="og:description"
    content="Colormatic Studios is a creative studio dedicated to giving life to
    Colormatic's projects. We are currently just a small group of passionate
    volunteers working to build inspiring, intuitive and innovative creative
    works."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org/studios/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <div
    class="cs-title flex h-[200px] items-center justify-center bg-cover lg:h-[300px]"
  >
    <span
      class="rounded-2xl bg-[#00000088] px-[38px] py-[28px] text-[200%] font-bold
      text-white shadow-[1px_1px_8px_#00000033] backdrop-blur-[5px] lg:text-[300%]"
    >
      Colormatic Studios
    </span>
  </div>

  <div class="mx-auto flex w-[90%] flex-col flex-wrap lg:w-[80%] lg:flex-row">
    <!-- prettier-ignore -->
    {#each [
      {
        title: "Quality First Person Controller",
        link: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person",
        description: "An actually good first person controller for the Godot Engine.",
        image: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person/raw/branch/main/icon.svg",
        pixelArt: false
      },
      {
        title: "BSON for Godot",
        link: "https://git.colormatic.org/ColormaticStudios/godot-bson",
        description: "A BSON serializer/deserializer for the Godot Engine.",
        image: "https://git.colormatic.org/ColormaticStudios/godot-bson/raw/branch/main/icon.svg",
        pixelArt: false
      },
      {
        title: "A Silly Game",
        link: "",
        description: "This is a silly little game project to get us started. Currently in closed pre-alpha.",
        image: "/img/studios/hatcat.webp",
        pixelArt: false
      },
      {
        title: "ColorQuest",
        link: "",
        description: "A simple browser MMORPG focused on social features. Currently in closed pre-alpha.",
        image: "/img/studios/colorquest.png",
        pixelArt: true
      }
    ] as item}

      <Panel className="flex-1 my-2 lg:m-4 lg:min-w-[40%] lg:max-w-[50%] p-4">
        <div class="p-4">
          {#if item.link}
            <a
              href="{item.link}"
              target="_blank"
              rel="noopener noreferrer"
              class="text-color underline text-center text-[200%] font-bold block"
            >
              {item.title}
            </a>
          {:else}
            <span class="text-center text-[200%] font-bold block">{item.title}</span>
          {/if}
        </div>
        <div class="flex">
          <img
            src="{item.image}"
            alt="First Person Logo"
            class="max-w-[120px] max-h-[150px] m-3 rounded-lg
            {item.pixelArt ? 'pixelart' : ''}"
          />
          <p class="pt-4">{item.description}</p>
        </div>
      </Panel>
    {/each}
  </div>

  <Hero>
    <span class="text-[200%] font-bold">About Us</span>
    <p class="justify pt-3">
      Colormatic Studios is a creative studio dedicated to giving life to
      Colormatic's ambitious future.
    </p>
    <p class="justify pt-3">
      We are currently just a passionate team of volunteers working to build
      inspiring, intuitive and innovative creative works. We don't have much to
      show right now, but we're working hard behind the scenes on projects we'll
      be introducing later.
    </p>
  </Hero>

  <Hero>
    <span class="text-[200%] font-bold">Links:</span>
    <div class="mx-auto flex lg:w-[60%]">
      <Linktree
        className="flex-1 mx-2"
        links={[
          {
            label: "Mastodon",
            url: "https://mastodon.social/@colormaticstudios",
          },
          {
            label: "Instagram",
            url: "https://www.instagram.com/colormaticstudios",
          },
          {
            label: "Youtube",
            url: "https://www.youtube.com/@colormaticstudios",
          },
        ]}
      />
      <Linktree
        className="flex-1 mx-2"
        links={[
          {
            label: "Colormatic Git",
            url: "https://git.colormatic.org/ColormaticStudios",
          },
          {
            label: "GitHub",
            url: "https://github.com/ColormaticStudios",
          },
          {
            label: "Bluesky",
            url: "https://bsky.app/profile/colormaticstudios.bsky.social",
          },
        ]}
      />
    </div>
  </Hero>
</main>

<Spacer />

<style lang="scss">
  div.cs-title {
    background-image: url("/img/colormatic_banner.svg");
  }

  img.pixelart {
    image-rendering: pixelated;
  }
</style>
