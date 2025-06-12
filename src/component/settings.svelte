<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { themes } from "../script/theme.ts";
  import { setCookie, getCookie } from "../script/cookie.ts";

  let panelRef = $state() as HTMLElement;

  let lightButtonIcon = $state() as HTMLElement;
  let darkButtonIcon = $state() as HTMLElement;
  let autoButtonIcon = $state() as HTMLElement;
  // In case easy access to the buttons themselves is useful, they are provided here.
  let lightButton = $state() as HTMLButtonElement;
  let darkButton = $state() as HTMLButtonElement;
  let autoButton = $state() as HTMLButtonElement;

  let { themeOption = $bindable() } = $props();

  let expanded = $state(false);
  let currentIcon = $state("bi-circle-half");

  let darkTheme: CallableFunction = getContext("darkTheme");

  function setThemeOption(newThemeOption: string) {
    expanded = false;
    setCookie("theme", newThemeOption);
    themeOption = newThemeOption;

    switch (newThemeOption) {
      case themes.LIGHT:
        currentIcon = "bi-sun-fill";
        break;
      case themes.DARK:
        currentIcon = "bi-moon-fill";
        break;
      case themes.AUTO:
        currentIcon = "bi-circle-half";
        break;
      default:
        console.error("Invalid theme option");
    }
  }

  onMount(() => {
    let themeCookie = getCookie("theme");
    if (Object.values(themes).includes(themeCookie)) {
      setThemeOption(themeCookie);
    }

    function handleClickOutside(event: MouseEvent) {
      if (panelRef && !panelRef.contains(event.target as HTMLElement)) {
        expanded = false;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function togglePanel() {
    expanded = !expanded;
  }
</script>

<div
  bind:this={panelRef}
  class="theme-toggle panel {darkTheme() ? 'dark-theme' : ''}"
>
  <button
    class="toggle-button"
    onclick={togglePanel}
    aria-label="Toggle Theme Selector"
  >
    <i class={`bi ${currentIcon}`}></i>
  </button>

  <!-- Unfortunately, we have to hard-code 72px because CSS won't animate `auto` or `min-content` -->
  <div class="button-group" style:height={expanded ? "68px" : "0px"}>
    <!-- Don't show the button if it is currently selected (it will be shown as the dropdown icon) -->
    {#if themeOption !== themes.DARK}
      <button
        aria-label="Dark Theme"
        bind:this={darkButton}
        onclick={() => setThemeOption(themes.DARK)}
      >
        <i bind:this={darkButtonIcon} class="bi bi-moon"></i>
      </button>
    {/if}

    {#if themeOption !== themes.LIGHT}
      <button
        aria-label="Light Theme"
        bind:this={lightButton}
        onclick={() => setThemeOption(themes.LIGHT)}
      >
        <i bind:this={lightButtonIcon} class="bi bi-sun"></i>
      </button>
    {/if}

    {#if themeOption !== themes.AUTO}
      <button
        aria-label="Auto Theme"
        bind:this={autoButton}
        onclick={() => setThemeOption(themes.AUTO)}
      >
        <i bind:this={autoButtonIcon} class="bi bi-circle-half"></i>
      </button>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "../style/global.scss";

  div.theme-toggle {
    padding: 4px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
  }

  button.toggle-button {
    font-size: 1.3rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: global.$text-color;
    aspect-ratio: 1 / 1;
  }

  div.button-group {
    overflow: hidden;
    transition: height 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  div.button-group button {
    margin: 2px 0;
    font-size: 1.3rem;
    background: transparent;
    border: none;
    color: global.$text-color;
    cursor: pointer;
  }

  @media screen and (max-width: global.$mobile-width) {
    div.button-group button {
      margin: 4px 0;
    }
  }
</style>
