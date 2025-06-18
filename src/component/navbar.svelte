<script lang="ts">
  import { getContext } from "svelte";

  let pages = $state() as HTMLElement;

  function toggleModalMenu() {
    pages.classList.toggle("hidden");
  }
  function modalMenuProcessClick(e: MouseEvent) {
    if (e.target == pages) {
      pages.classList.toggle("hidden");
    }
  }

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<nav>
  <a href="/" class="title nav-left">Colormatic</a>
  <img
    src="/img/colormatic_logo.svg"
    alt="Colormatic Logo"
    class="nav-center colormatic-logo"
  />
  <div class="nav-right inline">
    <ul class="responsive-hidden">
      <li><a href="/zakarya">Zakarya</a></li>
      <li><a href="/studios">Colormatic Studios</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <a
      href="https://git.colormatic.org"
      class="git-icon"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Colormatic Git"
    >
      <i class="bi bi-git"></i>
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
<span onclick={modalMenuProcessClick} bind:this={pages} class="modalbg hidden">
  <div class={darkTheme() ? "dark-theme" : ""}>
    <button onclick={toggleModalMenu} class="close" aria-label="Close">
      <i class="bi bi-x"></i>
    </button>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/zakarya">Zakarya</a></li>
      <li><a href="/studios">Colormatic Studios</a></li>
      <li>
        <a
          href="https://git.colormatic.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Colormatic Git
        </a>
      </li>
      <li>
        <a
          href="https://auth.colormatic.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Colormatic ID
        </a>
      </li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</span>

<style lang="scss">
  @use "../style/global.scss";

  nav {
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    align-items: center;
    padding: 12px;
    border-bottom: solid 1px global.$text-color;
    z-index: 1;

    margin: 0 auto;
    width: 95%;
    box-sizing: border-box;
    overflow-wrap: anywhere;
  }

  nav .nav-left {
    justify-self: left;
    grid-column: 1;
  }

  nav .nav-center {
    justify-self: center;
    grid-column: 2;
  }

  nav .nav-right {
    justify-self: right;
    grid-column: 3;
  }

  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
  }

  nav ul li {
    display: grid;
    justify-items: center;
  }

  nav a,
  nav button {
    padding: 0 8px;
    color: global.$text-color;
    text-decoration: none;

    display: flex;
    cursor: pointer;
    align-items: center;
  }

  nav a.title {
    font-size: 140%;
    font-weight: bold;
  }

  nav img.colormatic-logo {
    width: auto;
    height: 40px;
    padding: 4px;
  }

  nav button.menu-button {
    background: none;
    border: none;

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

  nav .git-icon i {
    font-size: 140%;
  }

  nav div.inline {
    display: flex;
  }

  @media screen and (max-width: global.$mobile-width) {
    nav {
      padding: 6px 0;
    }
    nav .git-icon i {
      font-size: 150%;
    }
    nav ul.responsive-hidden {
      display: none;
    }
  }

  /*/
   * Navigation modal section
  /*/

  span.modalbg.hidden {
    display: none;
  }

  span.modalbg {
    position: fixed;
    z-index: 1;
    padding: 0;
    margin: auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  span.modalbg div {
    width: 50ch;
    margin: 100px auto;
    padding: 16px;

    color: global.$text-color;
    border-radius: 8px;
    box-shadow: 1px 1px 8px #00000033;
    background-color: #ffffffbb;
    backdrop-filter: blur(5px);

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

  span.modalbg div button.close {
    float: right;
    width: min-content;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    font-size: 200%;
    color: global.$text-color;

    transition-duration: 0.2s;
  }

  span.modalbg div button.close:hover {
    color: #21afff;
  }

  span.modalbg div ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  span.modalbg div ul li {
    margin: 18px 12px;
  }

  span.modalbg div ul li a {
    color: global.$text-color;
    padding: 8px;
    text-decoration: none;
    font-size: 120%;
  }

  span.modalbg div ul li a:hover {
    color: #21afff;
  }

  @media screen and (max-width: global.$mobile-width) {
    span.modalbg div {
      width: 30ch;
    }
  }

  span.modalbg div.dark-theme {
    background-color: #000000bb;
  }
</style>
