<script lang="ts">
  import "style/main.scss";
  import "style/tailwind.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import Navbar from "blocks/navbar.svelte";
  import Footer from "blocks/footer.svelte";
  import Bg from "blocks/bg.svelte";
  import Settings from "blocks/settings.svelte";
  import { themes } from "script/theme.ts";
  import { onMount, setContext } from "svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }
  let { children }: Props = $props();

  let themeOption = $state(themes.AUTO);
  let darkTheme = $state(false);

  /*/
   * This is necessary for pages to read the theme,
   * sucks that we have to use an anonymous function
   * just to grab a variable
  /*/
  let darkThemeCallable = () => darkTheme;
  setContext("darkTheme", darkThemeCallable);

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

<svelte:head>
  <link rel="icon" href="/img/colormatic_logo.svg" />
</svelte:head>

<Bg bind:darkTheme />

<Navbar />

{@render children?.()}

<Settings bind:themeOption />

<Footer />
