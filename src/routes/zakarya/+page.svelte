<script lang="ts">
  import { getContext } from "svelte";

  let darkTheme: CallableFunction = getContext("darkTheme");
</script>

<svelte:head>
  <title>Colormatic - Zakarya</title>
  <meta
    name="description"
    content="I am a software and game developer, I run Colormatic and Colormatic
  Studios, and I primarily study computer science, psychology, and
  linguistics."
  />
  <link rel="canonical" href="https://colormatic.org/zakarya/" />

  <meta property="og:title" content="Colormatic - Zakarya" />
  <meta
    property="og:description"
    content="I am a software and game developer, I run Colormatic and Colormatic
  Studios, and I primarily study computer science, psychology, and
  linguistics."
  />
  <meta
    property="og:image"
    content="https://colormatic.org/img/zakarya-icon.svg"
  />
  <meta property="og:url" content="https://colormatic.org/zakarya/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main class={darkTheme() ? "dark-theme" : ""}>
  <img
    class="banner"
    src="/img/zakarya-banner.webp"
    alt="Zakarya Banner"
    srcset="/img/zakarya-banner.webp 960w, /img/zakarya-banner@2x.webp 1920w"
  />
  <div class="hero panel profile">
    <div class="nameplate">
      <img
        src="/img/zakarya-icon.webp"
        class="zakarya-icon"
        alt="Zakarya Icon"
        srcset="/img/zakarya-icon.webp 540w, /img/zakarya-icon@2x.webp 1080w"
      />
      <span class="name-title">Zakarya</span>
    </div>

    <div class="bio">
      <p>
        I am a software and game developer, I run Colormatic and Colormatic
        Studios, and I primarily study computer science, psychology, and
        linguistics.
      </p>
      <p>
        I have an intrinsic urge to create, and that's what Colormatic is all
        about. My works include world building, music, videos, 3D modeling,
        video games, websites, programs, and more.
      </p>
    </div>

    <div class="linktree-container">
      <ul class="linktree">
        <li>
          <a
            href="https://git.colormatic.org/zakarya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Colormatic Git
          </a>
        </li>
        <li>
          <a
            href="https://mstdn.party/@zakarya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastodon
          </a>
        </li>
        <li>
          <a
            href="https://ko-fi.com/zakarya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ko-fi
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@czakarya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
        </li>
        <li>
          <a
            href="https://github.com/CZakarya"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <!--<li><a href="https://www.reddit.com/user/CZakarya/" target="_blank" rel="noopener noreferrer">Reddit</a></li>-->
      </ul>
    </div>
  </div>

  <div class="hero panel">
    <h1>Featured Videos:</h1>
    <ul class="videolist">
      <li>
        <a
          href="https://www.youtube.com/watch?v=FWGCPIEM_-o"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://files.colormatic.org/zakarya/videos/thumbnail/wayforward.png"
            alt="Video Thumbnail"
          />
          <span class="title">The Way Forward</span>
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/watch?v=OPD8NqNu0nE"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://files.colormatic.org/zakarya/videos/thumbnail/helloworld.png"
            alt="Video Thumbnail"
          />
          <span class="title">Hello World</span>
        </a>
      </li>
    </ul>
  </div>
</main>

<spacer></spacer>

<style lang="scss">
  @use "../../style/global.scss";

  main img.banner {
    display: block;
    width: 70%;
    margin: 32px auto 32px auto;
    border: solid 1px #00000033;
    border-radius: 16px;
    box-shadow: 1px 1px 8px #00000033;
  }

  main div.profile {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  main div.profile div.nameplate {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  main div.profile div.nameplate img.zakarya-icon {
    width: 100px;
    border-radius: 16px;
    margin: 8px auto;
    display: block;
  }

  main div.profile div.nameplate span.name-title {
    font-size: 200%;
  }

  main div.profile div.bio {
    font-size: 120%;
    max-width: 50%;
    padding: 16px;
    margin: 12px;
    height: fit-content;
    text-align: left;
    /* text-align: justify;
    text-justify: auto; */
    border-radius: 16px;
    border: solid 1px;
    border-color: #383c3f33; // Same as text color but with alpha
  }

  main div.profile div.linktree-container {
    flex-grow: 1;
  }

  main div.profile div.linktree-container ul.linktree {
    width: 100%;
  }

  @media screen and (max-width: global.$mobile-width) {
    main img.banner {
      width: 95%;
      border-radius: 12px;
      margin: 24px auto;
    }

    main div.profile div.bio {
      max-width: unset;
    }

    main div.profile div.linktree-container ul.linktree {
      width: 60%;
    }

    main div.profile div.nameplate {
      flex-direction: row;
      align-items: end;
      justify-content: center;
    }

    main div.profile div.nameplate img.zakarya-icon {
      height: 1.25em;
      width: auto;
      font-size: 170%;
      margin: 0px 12px;
      border-radius: 10px;
    }

    main div.profile div.nameplate span.name-title {
      font-size: 170%;
    }
  }

  main.dark-theme div.profile div.bio {
    border-color: #ffffff55;
  }
</style>
