<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { themes } from "../script/theme";
  import { setCookie, getCookie } from "../script/cookie";
  import Panel from "components/panel.svelte";

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

  let darkTheme: () => boolean = getContext("darkTheme");

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

<div bind:this={panelRef} class="fixed right-5 bottom-5 flex">
  <Panel className="flex flex-col-reverse p-1">
    <button
      class="flex cursor-pointer items-center px-[5px] text-[1.3rem]"
      onclick={togglePanel}
      aria-label="Toggle Theme Selector"
    >
      <i class={`bi ${currentIcon}`}></i>
    </button>

    <!-- Unfortunately, we have to hard-code the pixel count because CSS won't animate `auto` or `min-content` -->
    <div
      class="button-group flex flex-col overflow-hidden"
      style:height={expanded ? "68px" : "0px"}
    >
      <!-- Don't show the button if it is currently selected (it will be shown as the dropdown icon) -->
      {#if themeOption !== themes.DARK}
        <button
          aria-label="Dark Theme"
          bind:this={darkButton}
          onclick={() => setThemeOption(themes.DARK)}
          class="cursor-pointer pb-1 text-[1.3rem]"
        >
          <i bind:this={darkButtonIcon} class="bi bi-moon"></i>
        </button>
      {/if}

      {#if themeOption !== themes.LIGHT}
        <button
          aria-label="Light Theme"
          bind:this={lightButton}
          class="cursor-pointer pb-1 text-[1.3rem]"
          onclick={() => setThemeOption(themes.LIGHT)}
        >
          <i bind:this={lightButtonIcon} class="bi bi-sun"></i>
        </button>
      {/if}

      {#if themeOption !== themes.AUTO}
        <button
          aria-label="Auto Theme"
          bind:this={autoButton}
          class="cursor-pointer pb-1 text-[1.3rem]"
          onclick={() => setThemeOption(themes.AUTO)}
        >
          <i bind:this={autoButtonIcon} class="bi bi-circle-half"></i>
        </button>
      {/if}
    </div>
  </Panel>
</div>

<style lang="scss">
  div.button-group {
    transition: height 0.3s ease;
  }

  // Click target color animation

  button {
    transition-duration: 0.2s;
  }

  button:hover {
    color: #21afff !important;
    /*/
     * Cascading styles was a mistake
     * I hate this code
     * But it works
    /*/
  }

  @media print {
    div {
      display: none;
    }
  }
</style>
