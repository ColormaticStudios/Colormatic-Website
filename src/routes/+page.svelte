<script lang="ts">
  import { onMount } from "svelte";
  import Spacer from "$lib/components/spacer.svelte";
  import Hero from "$lib/components/hero.svelte";
  import Panel from "$lib/components/panel.svelte";
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
</script>

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
  <div
    class="px-[12px] py-[38%] text-center text-[300%] font-bold
    lg:w-[80%] lg:p-[12%] lg:text-left lg:text-[350%]"
  >
    Colormatic: A non-profit project for creation.
  </div>

  <div class="scroll-arrow {atTop ? '' : 'hide'}">
    <i class="bi bi-arrow-down-circle-fill"></i>
  </div>

  <div style="margin-top:calc(100vh - 500px);"></div>

  <div class="mx-auto grid w-full max-w-6xl gap-4 px-3 lg:grid-cols-[2fr_1fr]">
    <Panel class="mx-auto w-min p-8 lg:mx-0">
      <h2 class="pt-2 text-center text-3xl font-bold">
        <a
          class="decoration-3 hover:underline dark:text-white!"
          target="_blank"
          rel="noopener noreferrer"
          href="https://git.colormatic.org/ColormaticStudios/quality-godot-first-person"
        >
          Quality First Person Controller
        </a>
      </h2>
      <div class="relative mt-6 w-[clamp(220px,70vw,520px)] max-w-full">
        <video
          bind:this={videoElement}
          src={selectedVideoSrc}
          autoplay
          muted
          loop
          playsinline
          class="w-full rounded-xl shadow-md"
          onclick={playVideo}
          onloadeddata={() => {
            void attemptAutoplay();
          }}
        ></video>
        {#if autoplayBlocked}
          <div class="absolute inset-0 m-auto h-fit w-fit">
            <button
              type="button"
              class="h-[42px] w-[42px] rounded-full bg-black/70 text-white"
              onclick={playVideo}
              aria-label="Play video"
            >
              <i class="bi bi-play-fill text-[175%]"></i>
            </button>
          </div>
        {/if}
      </div>
    </Panel>
    <div
      class="my-6 text-center text-[140%] font-semibold lg:my-auto lg:text-left"
    >
      An actually good first person controller for the Godot Engine.
    </div>
  </div>

  <Divider></Divider>

  <Spacer />

  <div class="text-center text-[200%] font-bold">More coming soon™</div>
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
