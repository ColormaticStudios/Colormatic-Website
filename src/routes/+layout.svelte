<script lang="ts">
  import "../style/main.scss";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import Navbar from "../component/navbar.svelte";
  import Footer from "../component/footer.svelte";
  import Bg from "../component/bg.svelte";
  import Settings from "../component/settings.svelte";
  import { themes } from "../script/theme.ts";
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
    // I'm so sorry about this code (good luck reading/debugging this)
    darkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.style.setProperty(
      "--text-color",
      darkTheme ? "white" : "#383c3f",
    );
    document.body.style.backgroundColor = darkTheme ? "black" : "white";
  }

  $effect(() => {
    themeOption;

    switch (themeOption) {
      case themes.LIGHT:
        darkTheme = false;
        document.documentElement.style.setProperty("--text-color", "#383c3f");
        document.body.style.backgroundColor = "white";
        break;
      case themes.DARK:
        darkTheme = true;
        document.documentElement.style.setProperty("--text-color", "white");
        document.body.style.backgroundColor = "black";
        break;
      case themes.AUTO:
        setAutoTheme();
    }
  });

  onMount(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (themeOption === themes.AUTO) {
          setAutoTheme();
        }
      });
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
