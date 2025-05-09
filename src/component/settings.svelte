<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { themes } from "../script/theme.ts";
  import { setCookie, getCookie } from "../script/cookie.ts";

  let lightButtonIcon = $state() as HTMLElement;
  let darkButtonIcon = $state() as HTMLElement;
  let autoButtonIcon = $state() as HTMLElement;
  // In case easy access to the buttons themselves is useful, they are provided here.
  let lightButton = $state() as HTMLButtonElement;
  let darkButton = $state() as HTMLButtonElement;
  let autoButton = $state() as HTMLButtonElement;

  let { themeOption = $bindable() } = $props();

  function setThemeOption(newThemeOption: string) {
    setCookie("theme", newThemeOption);
    switch (newThemeOption) {
      case themes.LIGHT:
        themeOption = themes.LIGHT;

        lightButtonIcon.classList.replace("bi-sun", "bi-sun-fill");
        darkButtonIcon.classList.replace("bi-moon-fill", "bi-moon");
        autoButtonIcon.classList.replace("bi-display-fill", "bi-display");
        break;
      case themes.DARK:
        themeOption = themes.DARK;

        lightButtonIcon.classList.replace("bi-sun-fill", "bi-sun");
        darkButtonIcon.classList.replace("bi-moon", "bi-moon-fill");
        autoButtonIcon.classList.replace("bi-display-fill", "bi-display");
        break;
      case themes.AUTO:
        themeOption = themes.AUTO;

        lightButtonIcon.classList.replace("bi-sun-fill", "bi-sun");
        darkButtonIcon.classList.replace("bi-moon-fill", "bi-moon");
        autoButtonIcon.classList.replace("bi-display", "bi-display-fill");
        break;
      default:
        console.error("setThemeOption was passed a value that is not a theme");
    }
  }

  onMount(() => {
    let themeCookie = getCookie("theme");
    if (Object.values(themes).includes(themeCookie)) {
      setThemeOption(themeCookie);
    }
  });

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<div class="panel settings {darkTheme() ? 'dark-theme' : ''}">
  <button
    aria-label="Dark Theme"
    bind:this={darkButton}
    onclick={() => {
      setThemeOption(themes.DARK);
    }}
  >
    <i bind:this={darkButtonIcon} class="bi bi-moon"></i>
  </button>
  <button
    aria-label="Light Theme"
    bind:this={lightButton}
    onclick={() => {
      setThemeOption(themes.LIGHT);
    }}
  >
    <i bind:this={lightButtonIcon} class="bi bi-sun"></i>
  </button>
  <button
    aria-label="Auto Theme"
    bind:this={autoButton}
    onclick={() => {
      setThemeOption(themes.AUTO);
    }}
  >
    <i bind:this={autoButtonIcon} class="bi bi-display-fill"></i>
  </button>
</div>

<style lang="scss">
  @use "../style/global.scss";

  div.panel.settings {
    padding: 6px 8px;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  div.panel.settings button {
    color: global.$text-color;
    font-size: 110%;
    cursor: pointer;

    // Reset buton style
    border: none;
    background-color: #00000000;
    border-radius: 0;
  }
</style>
