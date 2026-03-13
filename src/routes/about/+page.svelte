<script lang="ts">
  import Hero from "$lib/components/hero.svelte";
  import Linktree from "$lib/components/linktree.svelte";
  import Spacer from "$lib/components/spacer.svelte";
</script>

<svelte:head>
  <title>Colormatic - About</title>
  <meta
    name="description"
    content="Colormatic is a non-profit project by Zakarya dedicated to creation."
  />
  <meta name="keywords" content="Open Source, Non Profit" />
  <link rel="canonical" href="https://colormatic.org/about/" />

  <meta property="og:title" content="Colormatic - About" />
  <meta
    property="og:description"
    content="Colormatic is a non-profit project by Zakarya dedicated to creation."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org/about/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <div
    class="header flex h-50 items-center justify-center bg-cover lg:h-75"
  ></div>

  <Hero>
    <span class="text-2xl font-bold">About Colormatic</span>
    <p class="justify pt-3">
      Colormatic is a non-profit project from Zakarya for creating a curated
      ecosystem of sub-projects that match a high-quality, high attention to
      detail standard.
    </p>
    <p class="justify pt-3">
      Colormatic is still in the early stages, so expect many things to change
      in the near future.
    </p>
  </Hero>

  <Hero>
    <span class="text-2xl font-bold">Colormatic Studios</span>
    <p class="justify pt-3">
      Colormatic Studios is a creative studio intended to give talented people
      the opportunity to be creative. We are currently just a small group of
      passionate volunteers working to build inspiring, intuitive and innovative
      creative works.
    </p>
    <div class="mx-auto mt-2 flex lg:w-[60%]">
      <Linktree
        class="mx-2 flex-1"
        links={[
          {
            label: "Mastodon",
            url: "https://mastodon.social/@colormaticstudios",
            icon: "mastodon",
            color: "#6364FF",
          },
          {
            label: "Instagram",
            url: "https://www.instagram.com/colormaticstudios",
            icon: "instagram",
            color: "#C13584",
          },
          {
            label: "Youtube",
            url: "https://www.youtube.com/@colormaticstudios",
            icon: "youtube",
            color: "#FF0031",
          },
        ]}
      />
      <Linktree
        class="mx-2 flex-1"
        links={[
          {
            label: "Colormatic Git",
            url: "https://git.colormatic.org/ColormaticStudios",
            icon: "git",
            color: "#316996",
          },
          {
            label: "GitHub",
            url: "https://github.com/ColormaticStudios",
            icon: "github",
            color: "#08872B",
          },
          {
            label: "Bluesky",
            url: "https://bsky.app/profile/colormaticstudios.bsky.social",
            icon: "bluesky",
            color: "#0085FF",
          },
        ]}
      />
    </div>
  </Hero>
</main>

<Spacer />

<style>
  div.header {
    background-image: url("/img/colormatic_banner.svg");
  }
</style>
