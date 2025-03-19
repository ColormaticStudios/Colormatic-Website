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

<style lang="scss">
  @use "../../style/global.scss";

  div.cs-title {
    background-image: url("/img/colormatic_banner.svg");
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.cs-title h1 {
    color: white;
    background-color: #00000088;
    padding: 28px 38px;
    border-radius: 16px;
    font-size: 300%;
    box-shadow: 1px 1px 8px #00000033;
    backdrop-filter: blur(5px);
  }

  div.project-grid-container {
    display: flex;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media screen and (max-width: global.$mobile-width) {
    div.project-grid-container {
      width: 90%;
    }

    div.cs-title {
      height: 200px;
    }

    div.cs-title h1 {
      font-size: 200%;
    }
  }

  div.project-grid-container div.project-grid-box {
    flex: 1;
    margin: 16px;
    padding: 16px;
    min-width: 40%;
    max-width: 50%;
  }

  div.project-grid-container div.project-grid-box h1 {
    text-align: center;
  }

  div.project-grid-container div.project-grid-box h1 a {
    color: global.$text-color;
  }

  div.project-grid-container
    div.project-grid-box
    div.project-grid-box-contents {
    /* Yes, this absurdly long element selector is a joke */
    display: flex;
  }

  div.project-grid-container div.project-grid-box img {
    max-width: 120px;
    max-height: 150px;
    margin: 12px;
    border-radius: 8px;
  }

  @media screen and (max-width: global.$mobile-width) {
    div.project-grid-container div.project-grid-box {
      min-width: 90%;
      max-width: 90%;
    }

    div.project-grid-container div.project-grid-box img {
      max-width: 100px;
    }
  }
</style>
