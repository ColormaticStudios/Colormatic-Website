<script lang="ts">
  import { onMount } from "svelte";
  import Spacer from "$lib/components/spacer.svelte";
  import Panel from "$lib/components/panel.svelte";
  import Hero from "$lib/components/hero.svelte";
  import Divider from "$lib/components/divider.svelte";

  let atTop = $state(true);
  let videoElement = $state<HTMLVideoElement | null>(null);
  let selectedVideoSrc = $state(
    "https://files.colormatic.org/colormatic-website/fpc-480.webm",
  );
  let autoplayBlocked = $state(false);

  function checkScrollPos() {
    if (window.scrollY === 0) {
      atTop = true;
    } else {
      atTop = false;
    }
  }

  function updateVideoSource() {
    if (!videoElement) return;

    const dpr = window.devicePixelRatio || 1;
    const displayHeight = videoElement.clientHeight;
    const requiredPixels = displayHeight * dpr;
    const shouldUseHighDetail = requiredPixels > 480;
    const nextSrc = shouldUseHighDetail
      ? "https://files.colormatic.org/colormatic-website/fpc-720.webm"
      : "https://files.colormatic.org/colormatic-website/fpc-480.webm";

    if (selectedVideoSrc !== nextSrc) {
      selectedVideoSrc = nextSrc;
    }
  }

  async function attemptAutoplay() {
    if (!videoElement) return;

    try {
      await videoElement.play();
      autoplayBlocked = false;
    } catch {
      autoplayBlocked = true;
    }
  }

  function playVideo() {
    void attemptAutoplay();
  }

  onMount(() => {
    checkScrollPos(); // Check scrollpos at page load, some browsers resume scroll pos on page reload

    window.addEventListener("scroll", checkScrollPos);
    window.addEventListener("resize", updateVideoSource);
    const resizeObserver = new ResizeObserver(updateVideoSource);

    if (videoElement) {
      resizeObserver.observe(videoElement);
      updateVideoSource();
      void attemptAutoplay();
    }

    return () => {
      window.removeEventListener("scroll", checkScrollPos);
      window.removeEventListener("resize", updateVideoSource);
      resizeObserver.disconnect();
    };
  });

  type Links = {
    link: string;
    icon: string;
    iconAlt: string;
    name: string;
  }[];
</script>

{#snippet linkTags(links: Links)}
  {#each links as item}
    <a
      class="shrink-0 rounded-full border border-solid border-[#00000033] px-4 py-1 font-bold text-nowrap text-black! hover:border-[#21cbff] hover:text-[#21cbff]! dark:border-[#ffffff33] dark:text-white!"
      target="_blank"
      rel="noopener noreferrer"
      href={item.link}
    >
      <img
        class="mr-1 mb-1 inline h-[1em]"
        src={item.icon}
        alt={item.iconAlt}
      />
      {item.name}
    </a>
  {/each}
{/snippet}

<svelte:head>
  <title>Colormatic</title>
  <meta
    name="description"
    content="Colormatic is a non-profit project by Zakarya dedicated to creation."
  />
  <meta name="keywords" content="Open Source, Non Profit" />
  <link rel="canonical" href="https://colormatic.org" />

  <meta property="og:title" content="Colormatic" />
  <meta
    property="og:description"
    content="Colormatic is a non-profit project by Zakarya dedicated to creation."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <div class="grid min-h-screen grid-cols-1 lg:grid-cols-[2fr_1fr]">
    <span>
      <h1
        class="px-3 pt-48 pb-6 text-center text-[300%] font-bold lg:pt-[24%] lg:pr-0 lg:pl-[12%] lg:text-left lg:text-[350%]"
      >
        Colormatic: A non-profit project for creation.
      </h1>
      <h2
        class="px-24 text-center text-slate-400 lg:pr-12 lg:pl-[12%] lg:text-left"
      >
        Colormatic is an umbrella for all kinds of creative projects; like
        software, games, storytelling, music, and so much more.
      </h2>
    </span>
    <span><!-- Will have content soon! --></span>
  </div>

  <div class="scroll-arrow {atTop ? '' : 'hide'}">
    <i class="bi bi-arrow-down-circle-fill"></i>
  </div>

  <Panel
    class="mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
  >
    <div class="relative">
      <video
        bind:this={videoElement}
        src={selectedVideoSrc}
        autoplay
        muted
        loop
        playsinline
        class="w-full rounded-t-lg shadow-md"
        onclick={playVideo}
        onloadeddata={() => {
          void attemptAutoplay();
        }}
      ></video>
      {#if autoplayBlocked}
        <div class="absolute inset-0 m-auto h-fit w-fit">
          <button
            type="button"
            class="h-10.5 w-10.5 rounded-full bg-black/70 text-white"
            onclick={playVideo}
            aria-label="Play video"
          >
            <i class="bi bi-play-fill text-[175%]"></i>
          </button>
        </div>
      {/if}
    </div>
    <div class="p-12">
      <h2 class="text-center text-3xl font-bold md:text-left">
        <a
          class="decoration-3 hover:underline dark:text-white!"
          target="_blank"
          rel="noopener noreferrer"
          href="https://git.colormatic.org/ColormaticStudios/quality-godot-first-person"
        >
          Quality First Person Controller
        </a>
      </h2>
      <p class="mx-auto my-8 w-[80%] text-center md:mx-0 md:text-left">
        An actually good first person controller for the Godot Engine. Highly
        customizable, easily extendable, drop-in friendly addon for beginners
        and fast-moving experts that just makes sense.
      </p>
      <div class="flex flex-wrap justify-center gap-4 md:justify-start">
        {@render linkTags([
          {
            link: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person",
            icon: "/img/colormatic_logo.svg",
            iconAlt: "Colormatic Logo",
            name: "View on Colormatic Git",
          },
          {
            link: "https://godotengine.org/asset-library/asset/2418",
            icon: "https://godotengine.org/assets/press/icon_color.svg",
            iconAlt: "Godot Logo",
            name: "View on Godot Asset Library",
          },
        ])}
      </div>
    </div>
  </Panel>

  <Spacer />

  <Divider />

  <Spacer />

  <div class="mb-12 text-center text-5xl font-bold">More coming soon™</div>

  <Panel
    class="mx-auto w-[95%] border-dashed sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
  >
    <div class="p-12">
      <h2 class="text-center text-3xl font-bold md:text-left">
        <a
          class="decoration-3 hover:underline dark:text-white!"
          target="_blank"
          rel="noopener noreferrer"
          href="https://git.colormatic.org/ColormaticStudios/ecommerce"
        >
          Colormatic Ecommerce
        </a>
      </h2>
      <p class="mx-auto my-8 w-[80%] text-center md:mx-0 md:text-left">
        An open-source, self-hostable online store solution for individuals and
        small businesses.
      </p>
      <div class="flex flex-wrap justify-center gap-4 md:justify-start">
        {@render linkTags([
          {
            link: "https://git.colormatic.org/ColormaticStudios/ecommerce",
            icon: "/img/colormatic_logo.svg",
            iconAlt: "Colormatic Logo",
            name: "View on Colormatic Git",
          },
        ])}
      </div>
    </div>
  </Panel>
</main>

<Spacer />

<style>
  /*/
   * Yes, this isn't in Tailwind, but I really don't want to translate this
   * animation because Tailwind animations are stupidly verbose. With that,
   * I also didn't translate the CSS around it because I just don't want to.
  /*/
  main div.scroll-arrow {
    text-align: center;
    font-size: 200%;
    width: 100%;
    position: fixed;
    bottom: 64px;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.25s ease-in;

    @media print {
      display: none;
    }
  }

  main div.scroll-arrow.hide {
    opacity: 0;
    visibility: hidden;
    transition:
      visibility 0s 0.25s,
      opacity 0.25s ease-out;
  }
</style>
