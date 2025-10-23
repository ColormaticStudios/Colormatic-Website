<script lang="ts">
  import { getContext } from "svelte";

  let sidebarBGFade = $state() as HTMLElement;
  let sidebarOpen = $state(false);
  let sidebarAnimating = $state(false);
  let sidebarVisible = $state(false);

  let draggingStartX = 0;
  let draggingCurrentX = 0;
  let DraggingStartTime = 0;
  let dragging = false;
  let sidebar = $state() as HTMLDivElement;

  function toggleSidebar() {
    if (sidebar) {
      sidebar.style.transition = "";
      sidebar.style.transform = "";
      void sidebar.offsetWidth;
    }

    if (sidebarOpen) {
      sidebarAnimating = true;
      sidebarOpen = false;

      setTimeout(() => {
        sidebarAnimating = false;
        sidebarVisible = false;
        document.body.style.overflow = "";
      }, 350);
    } else {
      sidebarVisible = true;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        sidebarOpen = true;
      });
    }
  }

  function sidebarHandleClickOutside(e: MouseEvent) {
    if (e.target == sidebarBGFade) {
      toggleSidebar();
    }
  }

  function handleTouchStart(e: TouchEvent) {
    if (!sidebarOpen) return;
    dragging = true;
    draggingStartX = e.touches[0].clientX;
    draggingCurrentX = draggingStartX;
    DraggingStartTime = e.timeStamp || Date.now();

    sidebar.style.transition = "none";
    document.body.style.overflow = "hidden"; // Lock scrolling while swiping sidebar
  }

  function handleTouchMove(e: TouchEvent) {
    if (!dragging) return;
    draggingCurrentX = e.touches[0].clientX;
    const dx = draggingCurrentX - draggingStartX;
    const sidebarWidth = sidebar.offsetWidth;

    if (dx > 0) {
      const translateX = Math.min(dx, sidebarWidth);
      sidebar.style.transform = `translateX(${translateX}px)`;
    } else {
      sidebar.style.transform = `translateX(0px)`;
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!dragging) return;
    dragging = false;

    const dx = draggingCurrentX - draggingStartX;
    const dt = (e.timeStamp || Date.now()) - DraggingStartTime;
    const velocity = dx / Math.max(dt, 1);

    const sidebarWidth = sidebar.offsetWidth;
    const distanceThreshold = sidebarWidth * 0.4;
    const velocityThreshold = 0.5;

    sidebar.style.transition = "transform 0.3s ease";

    const shouldClose = dx > distanceThreshold || velocity > velocityThreshold;

    if (shouldClose) {
      sidebar.style.transform = `translateX(${sidebarWidth}px)`;
      setTimeout(() => {
        toggleSidebar();
        sidebar.style.transition = "";
        sidebar.style.transform = "";
      }, 300);
    } else {
      sidebar.style.transform = `translateX(0px)`;
      sidebar.style.transition = "";
    }

    document.body.style.overflow = "";
  }

  function handleTouchCancel() {
    if (!dragging) return;
    dragging = false;
    sidebar.style.transition = "transform 0.3s ease";
    sidebar.style.transform = `translateX(0px)`;

    document.body.style.overflow = "";

    setTimeout(() => {
      sidebar.style.transition = "";
      sidebar.style.transform = "";
    }, 300);
  }

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<nav
  class="mx-auto box-border grid w-[95%] grid-cols-[1fr_min-content_1fr] items-center border-b border-b-[var(--text-color)] p-2 wrap-anywhere lg:p-3"
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
        <li class="items-center grid"><a href={item.link}>{item.label}</a></li>
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
    <button onclick={toggleSidebar} class="menu-button" aria-label="menu">
      <i class="bi bi-list text-4xl"></i>
    </button>
  </div>
</nav>

<!--
The following Svelte ignore statements aren't ideal, but it seems to be
the only way to achieve a proper sidebar. They even do this in the
Svelte modal example, https://svelte.dev/playground/modal
-->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<span
  onclick={sidebarHandleClickOutside}
  bind:this={sidebarBGFade}
  class="fixed inset-0 z-40 transition-colors duration-300
    {sidebarOpen
    ? 'pointer-events-auto bg-black/50 backdrop-blur-[2px]'
    : 'pointer-events-none bg-transparent'}"
>
  <div
    bind:this={sidebar}
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
    ontouchcancel={handleTouchCancel}
    class="sidebar-animate fixed top-0 right-0 flex h-full w-[280px] flex-col overflow-y-auto p-6 shadow-2xl
      {darkTheme()
      ? 'border-white/10 bg-[#383c3faa]'
      : 'border-white bg-[#ffffffaa]'}
      {sidebarOpen ? 'slide-in' : 'slide-out'}
      border-l lg:w-[340px]"
  >
    <!-- We are setting the hidden value so that screen readers don't read the elements that are hidden -->
    <button
      onclick={toggleSidebar}
      class="mb-8 w-min cursor-pointer self-end text-3xl transition-colors duration-200 hover:text-[#21afff]"
      aria-label="Close"
      hidden={!sidebarVisible}
    >
      <i class="bi bi-x"></i>
    </button>

    <nav hidden={!sidebarVisible}>
      <ul class="flex flex-col gap-4">
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
          label: "Colormatic Library",
          link: "https://library.colormatic.org",
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

      <li>
        {#if item.newTab}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            class="group block rounded-lg text-lg font-medium transition-all duration-200
              hover:bg-white/10 hover:pl-4"
          >
            <span class="relative">
              {item.label}
              <span class="absolute left-0 bottom-0 h-[2px] w-0 bg-[#21afff] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
        {:else}
          <a
            href={item.link}
            class="group block rounded-lg text-lg font-medium transition-all duration-200
              hover:bg-white/10 hover:pl-4"
          >
            <span class="relative">
              {item.label}
              <span class="absolute left-0 bottom-0 h-[2px] w-0 bg-[#21afff] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
        {/if}
      </li>
      {/each}
      </ul>
    </nav>
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

  // These are in CSS because they need to override other values
  nav button.menu-button {
    transition-duration: 0.2s;
  }

  nav button.menu-button:hover {
    color: #21afff;
  }

  /*/
   * Navigation sidebar section
  /*/

  .sidebar-animate {
    transform: translateX(100%);
    opacity: 0;
    transition:
      transform 0.35s ease,
      opacity 0.35s ease;
  }

  .slide-in {
    transform: translateX(0%);
    opacity: 1;
  }

  .slide-out {
    transform: translateX(100%);
    opacity: 0;
  }

  @media print {
    nav {
      display: none;
    }
  }
</style>
