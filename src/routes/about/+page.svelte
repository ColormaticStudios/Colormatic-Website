<script lang="ts">
  import Hero from "components/hero.svelte";
  import Spacer from "components/spacer.svelte";
  import { getContext } from "svelte";

  let darkTheme: CallableFunction = getContext("darkTheme");
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

<Spacer />

<main>
  <Hero>
    <span class="text-[200%] font-bold">
      Colormatic: A non-profit project for creation.
    </span>
    <p class="justify pt-3">
      Colormatic is a non-profit project from Zakarya for creating a curated
      collection of sub-projects that match a high-quality, high attention to
      detail standard.
    </p>
    <p class="justify pt-3">
      Colormatic is still in the early stages, so expect many things to change
      in the near future.
    </p>
    <p class="justify pt-3">
      Colormatic Studios is a creative studio intended to give talented people
      the opportunity to be creative. We are currently just a small group of
      passionate volunteers working to build inspiring, intuitive and innovative
      creative works.
    </p>
  </Hero>
</main>

<Spacer />
