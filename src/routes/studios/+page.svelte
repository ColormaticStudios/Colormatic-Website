<script lang="ts">
  import "../../style/studios.scss";
</script>

<svelte:head>
  <title>Colormatic Studios</title>
</svelte:head>

<main>
  <div class="cs-title"><h1>Colormatic Studios</h1></div>

  <div class="project-grid-container">
    <div class="project-grid-box panel">
      <h1>
        <a
          href="https://git.colormatic.org/ColormaticStudios/quality-godot-first-person"
          target="_blank"
          rel="noopener noreferrer">Quality First Person Controller</a
        >
      </h1>
      <div class="project-grid-box-contents">
        <img
          src="https://git.colormatic.org/ColormaticStudios/quality-godot-first-person/raw/branch/main/icon.svg"
          alt="First Person Logo"
        />
        <p>An actually good first person controller for the Godot Engine.</p>
      </div>
    </div>
    <div class="project-grid-box panel">
      <h1>
        <a
          href="https://git.colormatic.org/ColormaticStudios/godot-bson"
          target="_blank"
          rel="noopener noreferrer">BSON for Godot</a
        >
      </h1>
      <div class="project-grid-box-contents">
        <img
          src="https://git.colormatic.org/ColormaticStudios/godot-bson/raw/branch/main/icon.svg"
          alt="Godot BSON Logo"
        />
        <p>A BSON serializer/deserializer for the Godot Engine.</p>
      </div>
    </div>
    <div class="project-grid-box panel">
      <h1>A Silly Game</h1>
      <div class="project-grid-box-contents">
        <img src="/img/studios/hatcat.webp" alt="HatCat" />
        <p>
          This is a silly little game project to get us started.
          <br />
          Currently in closed pre-alpha.
        </p>
      </div>
    </div>
    <div class="project-grid-box panel">
      <h1>ColorQuest</h1>
      <div class="project-grid-box-contents">
        <img
          src="/img/studios/colorquest.png"
          class="pixelart"
          alt="ColorQuest"
        />
        <p>
          A simple browser MMORPG focused on social features.
          <br />
          Currently in closed pre-alpha.
        </p>
      </div>
    </div>
  </div>

  <div class="hero panel">
    <h1>Links:</h1>
    <div class="double-linktree">
      <ul class="linktree">
        <li>
          <a
            href="https://mastodon.social/@colormaticstudios"
            target="_blank"
            rel="noopener noreferrer">Mastodon</a
          >
        </li>
        <li>
          <a
            href="https://www.instagram.com/colormaticstudios/"
            target="_blank"
            rel="noopener noreferrer">Instagram</a
          >
        </li>
        <li>
          <a
            href="https://www.youtube.com/@colormaticstudios"
            target="_blank"
            rel="noopener noreferrer">Youtube</a
          >
        </li>
      </ul>
      <ul class="linktree">
        <li>
          <a
            href="https://git.colormatic.org/ColormaticStudios"
            target="_blank"
            rel="noopener noreferrer">Colormatic Git</a
          >
        </li>
        <li>
          <a
            href="https://github.com/ColormaticStudios"
            target="_blank"
            rel="noopener noreferrer">GitHub</a
          >
        </li>
        <li>
          <a
            href="https://bsky.app/profile/colormaticstudios.bsky.social"
            target="_blank"
            rel="noopener noreferrer">Bluesky</a
          >
        </li>
      </ul>
    </div>
  </div>
</main>

<spacer></spacer>
