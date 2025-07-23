<script lang="ts">
  import { getContext } from "svelte";

  let modal = $state() as HTMLElement;
  let modalOpenState = $state(false);

  function toggleModalMenu() {
    modalOpenState = !modalOpenState;
  }

  function modalHandleClickOutside(e: MouseEvent) {
    if (e.target == modal) {
      toggleModalMenu();
    }
  }

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<nav
  class="mx-auto box-border grid w-[95%] grid-cols-[1fr_min-content_1fr]
  items-center border-b border-b-[var(--text-color)] p-2 wrap-anywhere lg:p-3"
>
  <a href="/" class="justify-self-start text-[140%] font-bold">Colormatic</a>
  <img
    src="/img/colormatic_logo.svg"
    alt="Colormatic Logo"
    class="h-[40px] max-w-[unset]"
  />
  <div class="flex justify-self-end">
    <ul
      class="responsive-hidden hidden
      flex-row lg:flex"
    >
      <!-- prettier-ignore -->
      {#each [
        {
          label: "Zakarya",
          link: "/zakarya"
        },
        {
          label: "Colormatic Studios",
          link: "/studios"
        },
        {
          label: "About",
          link: "/about"
        }
      ] as item}
        <li><a href={item.link}>{item.label}</a></li>
      {/each}
    </ul>
    <a
      href="https://git.colormatic.org"
      class="git-icon"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Colormatic Git"
    >
      <i class="bi bi-git text-[160%]"></i>
    </a>
    <button onclick={toggleModalMenu} class="menu-button" aria-label="menu">
      <i class="bi bi-list"></i>
    </button>
  </div>
</nav>

<!--
The following Svelte ignore statements aren't ideal, but it seems to be
the only way to achieve a proper modal. They even do this in the
Svelte modal example, https://svelte.dev/playground/modal
-->

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<span
  onclick={modalHandleClickOutside}
  bind:this={modal}
  class="fixed top-0 left-0 z-1 m-auto h-full w-full bg-[#00000066]
  {modalOpenState ? '' : 'hidden'}"
>
  <div
    class="modal-animate mx-auto mt-[100px] w-[30ch] rounded-lg p-4
    shadow-[1px_1px_8px_#00000033] backdrop-blur-[5px] lg:w-[50ch]
    {darkTheme() ? 'bg-[#000000bb]' : 'bg-[#ffffff88]'}"
  >
    <button
      onclick={toggleModalMenu}
      class="float-right w-min cursor-pointer text-[200%] text-[var(--text-color)]
      duration-[0.2s] hover:text-[#21afff]"
      aria-label="Close"
    >
      <i class="bi bi-x"></i>
    </button>
    <ul>
      <!-- prettier-ignore -->
      {#each [
        {
          label: "Home",
          link: "/",
          newTab: false
        },
        {
          label: "Zakarya",
          link: "/zakarya",
          newTab: false
        },
        {
          label: "Colormatic Studios",
          link: "/studios",
          newTab: false
        },
        {
          label: "Colormatic Git",
          link: "https://git.colormatic.org",
          newTab: true
        },
        {
          label: "Colormatic ID",
          link: "https://auth.colormatic.org",
          newTab: true
        },
        {
          label: "About",
          link: "/about",
          newTab: false
        }
      ] as item}

      <li class="mx-[12px] my-[18px]">
        {#if item.newTab}
          <a
            href="{item.link}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-color p-2 text-[120%]"
          >
            {item.label}
          </a>
        {:else}
          <a
            href="{item.link}"
            class="text-color p-2 text-[120%]"
          >
            {item.label}
          </a>
        {/if}
      </li>
      {/each}
    </ul>
  </div>
</span>

<style lang="scss">
  nav a,
  nav button {
    padding: 0 8px;
    color: var(--text-color);

    display: flex;
    cursor: pointer;
    align-items: center;
  }

  nav ul li {
    display: grid;
    align-items: center;
  }

  nav button.menu-button {
    transition-duration: 0.2s;
  }

  nav button.menu-button:hover {
    color: #21afff;
  }

  nav .menu-button i {
    font-size: 230%;

    /*/
     * Ugly hack to account for the fact that the menu icon is off-center
     * (Bootstrap please fix)
    /*/
    transform: translateY(-1px);
  }

  /*/
   * Navigation modal section
  /*/

  div.modal-animate {
    animation-name: modal-animate-in;
    animation-duration: 0.4s;
  }

  @keyframes modal-animate-in {
    from {
      transform: translate(0px, -300px);
      opacity: 0;
    }
    to {
      transform: translate(0px, 0px);
      opacity: 1;
    }
  }

  @media print {
    nav {
      display: none;
    }
  }
</style>
