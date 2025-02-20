<script lang="ts">
  function toggleModalMenu() {
    var pages = document.getElementById("pages") as HTMLElement;
    pages.classList.toggle("hidden");
  }
  function modalMenuProcessClick(e: MouseEvent) {
    var pages = document.getElementById("pages") as HTMLElement;
    if (e.target == pages) {
      pages.classList.toggle("hidden");
    }
  }
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
      aria-label="Colormatic Git"><i class="bi bi-git"></i></a
    >
    <button on:click={toggleModalMenu} class="menu-button" aria-label="menu"
      ><i class="bi bi-list"></i></button
    >
  </div>
</nav>

<!--
The following Svelte ignore statements aren't ideal, but it seems to be
the only way to achieve a proper modal. They even do this in the
Svelte modal example, https://svelte.dev/playground/modal
-->

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<span on:click={modalMenuProcessClick} id="pages" class="modalbg hidden">
  <div>
    <button on:click={toggleModalMenu} class="close" aria-label="Close"
      ><i class="bi bi-x"></i></button
    >
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/zakarya">Zakarya</a></li>
      <li><a href="/studios">Colormatic Studios</a></li>
      <li>
        <a
          href="https://git.colormatic.org"
          target="_blank"
          rel="noopener noreferrer">Colormatic Git</a
        >
      </li>
      <li>
        <a
          href="https://auth.colormatic.org"
          target="_blank"
          rel="noopener noreferrer">Colormatic ID</a
        >
      </li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</span>
