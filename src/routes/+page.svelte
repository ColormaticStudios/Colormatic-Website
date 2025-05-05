<script lang="ts">
  import { onMount } from "svelte";

  let arrow = $state() as HTMLDivElement;

  function checkArrow(e: Event) {
    if (window.scrollY != 0) {
      if (!arrow.classList.contains("scroll-arrow-hide")) {
        arrow.classList.add("scroll-arrow-hide");
      }
    } else {
      if (arrow.classList.contains("scroll-arrow-hide")) {
        arrow.classList.remove("scroll-arrow-hide");
      }
    }
  }

  onMount(() => {
    window.addEventListener("scroll", checkArrow);

    return () => {
      window.removeEventListener("scroll", checkArrow);
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
  <div class="brand-heading">
    <h1>Colormatic: A non-profit project for creation.</h1>
  </div>

  <div bind:this={arrow} class="scroll-arrow">
    <i class="bi bi-arrow-down-circle-fill"></i>
  </div>

  <div style="margin-top:25vh"></div>

  <div class="heading">Featured Colormatic Studios Projects:</div>
  <div class="hero panel">
    <h1>
      <a
        href="https://git.colormatic.org/ColormaticStudios/quality-godot-first-person"
        target="_blank"
        rel="noopener noreferrer"
      >
        Quality First Person Controller
      </a>
    </h1>
    <p>An actually good first person controller for the Godot Engine.</p>

    <div class="divider"></div>

    <h1>
      <a
        href="https://git.colormatic.org/ColormaticStudios/godot-bson"
        target="_blank"
        rel="noopener noreferrer"
      >
        BSON for Godot
      </a>
    </h1>
    <p>A BSON serializer/deserializer for the Godot Engine</p>
  </div>

  <spacer></spacer>

  <div class="hero panel">
    <h1>
      <i class="bi bi-tools" style="padding-right: 12px;"></i>
      This website is under construction.
    </h1>
    <p>
      Check up on progress and changes at <a
        href="https://git.colormatic.org/ColormaticStudios/Colormatic-Website"
        target="_blank"
        rel="noopener noreferrer"
      >
        ColormaticStudios/Colormatic-Website
      </a>
      .
    </p>
  </div>
</main>

<spacer></spacer>

<style lang="scss">
  @use "../style/global.scss";

  main div.brand-heading {
    padding: 12%;
    width: 60%;
  }

  main div.brand-heading h1 {
    font-size: 300%;
  }

  main div.heading {
    font-size: 250%;
    text-align: center;
    padding: 12px;
  }

  @media screen and (max-width: global.$mobile-width) {
    main div.brand-heading {
      padding: 38% 12px;
      text-align: center;
      width: initial;
    }

    main div.heading {
      font-size: 200%;
    }
  }
</style>
