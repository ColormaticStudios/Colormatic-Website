<script lang="ts">
  import "$lib/styles/main.scss";
  import "$lib/styles/tailwind.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import Navbar from "$lib/blocks/navbar.svelte";
  import Footer from "$lib/blocks/footer.svelte";
  import Bg from "$lib/blocks/bg.svelte";
  import Settings from "$lib/blocks/settings.svelte";
  import { themes } from "$lib/theme";
  import { onMount } from "svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }
  let { children }: Props = $props();

  let themeOption = $state(themes.AUTO);
  let darkTheme = $state(false);

  function setAutoTheme() {
    darkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.dataset.theme = darkTheme ? "dark" : "light";
  }

  $effect(() => {
    switch (themeOption) {
      case themes.LIGHT:
        darkTheme = false;
        document.documentElement.dataset.theme = "light";
        break;
      case themes.DARK:
        darkTheme = true;
        document.documentElement.dataset.theme = "dark";
        break;
      case themes.AUTO:
        setAutoTheme();
    }
  });

  onMount(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (themeOption === themes.AUTO) {
        setAutoTheme();
      }
    };

    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  });
</script>

<Bg bind:darkTheme />

<Navbar />

{@render children?.()}

<Settings bind:themeOption />

<Footer />
