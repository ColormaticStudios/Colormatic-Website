<script lang="ts">
  function toggleModalMenu() {
    var pages = document.getElementById("pages") as HTMLElement;
    pages.classList.toggle("hidden");
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
    <button
      on:click={toggleModalMenu}
      class="responsive menu-button"
      aria-label="menu"><i class="bi bi-list"></i></button
    >
  </div>
</nav>
<span id="pages" class="modalbg hidden">
  <script>
    // A dirty way to close the modal when the user clicks outside
    var pages = document.getElementById("pages");
    pages.addEventListener("click", (e) => {
      if (e.target == pages) {
        pages.classList.toggle("hidden");
      }
    });
  </script>
  <div>
    <button on:click={toggleModalMenu} class="close" aria-label="Close"
      ><i class="bi bi-x"></i></button
    >
    <ul>
      <li><a href="/zakarya">Zakarya</a></li>
      <li><a href="/studios">Colormatic Studios</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</span>
