<script lang="ts">
  import Hero from "components/hero.svelte";
  import Linktree from "components/linktree.svelte";
  import Spacer from "components/spacer.svelte";
  import { getContext } from "svelte";

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<svelte:head>
  <title>Colormatic - Zakarya</title>
  <meta
    name="description"
    content="I am a software and game developer, I run Colormatic and Colormatic
  Studios, and I primarily study computer science, psychology, and
  linguistics."
  />
  <link rel="canonical" href="https://colormatic.org/zakarya/" />

  <meta property="og:title" content="Colormatic - Zakarya" />
  <meta
    property="og:description"
    content="I am a software and game developer, I run Colormatic and Colormatic
  Studios, and I primarily study computer science, psychology, and
  linguistics."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org/zakarya/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <img
    class="mx-auto mt-8 mb-8 block w-[95%] rounded-2xl border border-[#00000033]
    shadow-[1px_1px_8px_#00000033] lg:w-[70%]"
    src="/img/zakarya-banner.webp"
    alt="Zakarya Banner"
    srcset="/img/zakarya-banner.webp 960w, /img/zakarya-banner@2x.webp 1920w"
  />
  <Hero className="flex flex-wrap items-center flex-col lg:flex-row">
    <div class="flex grow lg:flex-col">
      <img
        src="/img/zakarya-icon.webp"
        class="mx-4 my-2 block h-[38px] rounded-xl lg:mx-auto lg:h-auto lg:w-[100px] lg:rounded-2xl"
        alt="Zakarya Icon"
        srcset="/img/zakarya-icon.webp 540w, /img/zakarya-icon@2x.webp 1080w"
      />
      <span class="text-[200%]">Zakarya</span>
    </div>

    <div
      class="m-3 h-fit rounded-2xl border p-4 text-left text-[120%] lg:max-w-1/2
      {darkTheme() ? 'border-[#ffffff33]' : 'border-[#00000033]'}"
    >
      <p class="mb-4">
        I am a software and game developer, I run Colormatic and Colormatic
        Studios, and I primarily study computer science, psychology, and
        linguistics.
      </p>
      <p>
        I have an intrinsic urge to create, and that's what Colormatic is all
        about. My works include world building, music, videos, 3D modeling,
        video games, websites, programs, and more.
      </p>
    </div>

    <div class="w-[60%] grow lg:w-[unset]">
      <Linktree
        links={[
          {
            url: "https://git.colormatic.org/zakarya",
            label: "Colormatic Git",
          },
          {
            url: "https://mstdn.party/@zakarya",
            label: "Mastodon",
          },
          {
            url: "https://ko-fi.com/zakarya",
            label: "Ko-fi",
          },
          {
            url: "https://www.youtube.com/@czakarya",
            label: "Youtube",
          },
          {
            url: "https://github.com/CZakarya",
            label: "GitHub",
          },
        ]}
      />
    </div>
  </Hero>
</main>

<Spacer />
