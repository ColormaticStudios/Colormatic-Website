<script lang="ts">
  import { getContext, onMount } from "svelte";
  import Spacer from "components/spacer.svelte";
  import Hero from "components/hero.svelte";
  import Divider from "components/divider.svelte";

  let atTop = $state(true);

  function checkScrollPos() {
    if (window.scrollY === 0) {
      atTop = true;
    } else {
      atTop = false;
    }
  }

  onMount(() => {
    window.addEventListener("scroll", checkScrollPos);

    return () => {
      window.removeEventListener("scroll", checkScrollPos);
    };
  });

  let darkTheme: CallableFunction = getContext("darkTheme");
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
    lg:w-[70%] lg:p-[12%] lg:text-left lg:text-[350%]"
  >
    Colormatic: A non-profit project for creation.
  </div>

  <div class="scroll-arrow {atTop ? '' : 'hide'}">
    <i class="bi bi-arrow-down-circle-fill"></i>
  </div>

  <div style="margin-top:calc(100vh - 500px);"></div>

  <div class="p-3 text-center text-[250%]">
    Featured Colormatic Studios Projects:
  </div>
  <Hero>
    <!--
    Prettier wants to pack all of this data into one line, probably a bug.
    This must be formatted manually.

    This issue happens in various places around the codebase, whenever we
    stuff data directly into an #each statement. This is the most prominent
    place though, so I'll stick this comment here.

    Notice that Prettier also won't format the code inside the #each statement,
    which means that the Tailwind classes won't get sorted. I'll miss that
    feature.
    -->
    <!-- prettier-ignore -->
    {#each [
      {
        title: "Quality First Person Controller",
        link: "https://git.colormatic.org/ColormaticStudios/quality-godot-first-person",
        description: "An actually good first person controller for the Godot Engine."
      },
      {
        title: "BSON for Godot",
        link: "https://git.colormatic.org/ColormaticStudios/godot-bson",
        description: "A BSON serializer/deserializer for the Godot Engine"
      }
    ] as item, index}

      {#if index !== 0}
        <Divider />
      {/if}

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        class="text-color text-[200%] font-bold underline"
      >
        {item.title}
      </a>
      <p class="pt-3">{item.description}</p>
    {/each}
  </Hero>

  <Spacer />

  <Hero>
    <span class="text-[200%] font-bold">
      <i class="bi bi-tools pr-3"></i>
      This website is under construction.
    </span>
    <p class="p-3">
      Check up on progress and changes at <a
        href="https://git.colormatic.org/ColormaticStudios/Colormatic-Website"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
      >
        ColormaticStudios/Colormatic-Website
      </a>
    </p>
  </Hero>
</main>

<Spacer />

<style lang="scss">
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
