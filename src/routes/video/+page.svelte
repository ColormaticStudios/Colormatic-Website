<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    let channel = getParam("c");
    let video = getParam("v");
    // Don't request an empty string
    if (channel && video) {
      getVideo(channel, video);
    }
  });

  const BASEURL = "https://files.colormatic.org/";

  export function getParam(paramName: string) {
    var params = new URLSearchParams(window.location.search);
    let t_param = params.get(paramName);
    return t_param ? t_param : ""; // Return empty string if null
  }

  async function getJSON(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);

    const data = response.json();
    return data;
  }

  export function getVideo(cname: string, vname: string) {
    var videoplayer = document.getElementById("videoplayer") as HTMLElement;
    var videotitle = document.getElementById("videotitle") as HTMLElement;
    var videodescription = document.getElementById(
      "videodescription",
    ) as HTMLElement;
    var videodownload = document.getElementById("videodownload") as HTMLElement;
    var sourcedownload = document.getElementById(
      "sourcedownload",
    ) as HTMLElement;
    getJSON(BASEURL + cname + "/videos/data/" + vname + ".json")
      .then((data) => {
        let videoURL =
          BASEURL +
          cname +
          "/videos/raw/" +
          data.video_file +
          "." +
          data.video_format;
        videoplayer.setAttribute(
          "poster",
          BASEURL + cname + "/videos/thumbnail/" + data.thumbnail,
        );
        var videosource = document.createElement("source");
        videosource.setAttribute("src", videoURL);
        videosource.setAttribute("type", "video/" + data.video_format);
        videoplayer.appendChild(videosource);

        document.title = data.title;
        videotitle.innerText = data.title;
        data.description.forEach((iter: number) => {
          // TODO: Detect if one of these lines contains a link and if so, make it a link
          videodescription.appendChild(
            document.createTextNode(iter.toString()),
          );
          videodescription.appendChild(document.createElement("br"));
        });

        videodownload.setAttribute(
          "href",
          BASEURL +
            cname +
            "/videos/raw/" +
            data.video_file +
            "." +
            data.video_format,
        );
        videodownload.setAttribute(
          "download",
          data.video_file + "." + data.video_format,
        );
        sourcedownload.setAttribute(
          "href",
          BASEURL +
            cname +
            "/videos/source/" +
            data.source_file +
            "." +
            data.source_format,
        );
        sourcedownload.setAttribute(
          "download",
          data.source_file + "." + data.source_format,
        );
      })
      .catch((error) => {
        videotitle.innerText = "Failed to load video.";
        console.error(error);
      });
  }
</script>

<svelte:head>
  <title>Video Player</title>
  <meta property="og:type" content="video" />
</svelte:head>

<spacer></spacer>

<main>
  <div class="video container">
    <!-- Video elements are set by a script -->
    <!-- svelte-ignore a11y_media_has_caption -->
    <video id="videoplayer" controls></video>
    <div class="videoobjects">
      <div class="videodetails">
        <h1 id="videotitle">Video Player</h1>
        <p id="videodescription" class="justify"></p>
      </div>
      <div class="dropdown-container">
        <div class="download-dropdown">
          <i class="bi bi-download"></i>
          <div class="dropdown-content">
            <ul>
              <li><a id="videodownload">Download Video</a></li>
              <li><a id="sourcedownload">Download Source</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<spacer></spacer>

<style lang="scss">
  @use "../../style/global.scss";

  div.video.container {
    display: flex;
    color: global.$text-color;
    width: 90%;
    margin: 16px auto 16px auto;
    border: solid 1px #00000033;
    border-radius: 8px;
    box-shadow: 1px 1px 8px #00000033;
    padding: 16px;
    background-color: #ffffff22;
    backdrop-filter: blur(3px);
  }

  div.video.container video#videoplayer {
    flex-grow: 1;
    border-radius: 12px;
    height: auto;
    max-width: 55%;
  }

  div.video.container div.videoobjects {
    display: grid;
    padding: 24px;
  }

  div.video.container div.videodetails h1#videotitle {
    padding: 0 12px;
  }

  div.dropdown-container {
    display: flex;
    flex-direction: column-reverse;
  }

  div.video.container div.download-dropdown {
    position: relative;
    display: inline-block;
    padding: 12px;
    width: 25px;
    height: 25px;
    background-color: #21afff;
    box-shadow: 1px 1px 8px #00000033;
    border-radius: 50px;
    transition-duration: 0.35s;
    font-size: 120%;
    text-align: center;
  }

  div.video.container div.download-dropdown:hover {
    box-shadow: 1px 1px 8px #00000088;
  }

  div.video.container div.download-dropdown div.dropdown-content {
    display: none;
    position: absolute;
    font-size: 80%;
    min-width: 160px;
    background-color: #edeeee;
    box-shadow: 1px 1px 8px #00000033;
    border-radius: 8px;
    text-align: center;
  }

  div.video.container div.download-dropdown:hover div.dropdown-content {
    display: block;
  }

  div.video.container div.download-dropdown div.dropdown-content ul {
    list-style-type: none;
    padding-left: 0;
  }

  div.video.container div.download-dropdown div.dropdown-content ul li {
    padding: 4px;
    cursor: pointer;
  }

  div.video.container div.download-dropdown div.dropdown-content ul li:hover {
    background-color: #dcdfdf;
  }

  div.video.container div.download-dropdown div.dropdown-content ul li a {
    text-decoration: none;
    color: global.$text-color;
  }

  @media screen and (max-width: global.$mobile-width) {
    div.video.container {
      display: block;
    }
    div.video.container video#videoplayer {
      width: 100%;
      max-width: none;
    }
    div.video.container div.download-dropdown {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 12px;
    }
  }

  @media (prefers-color-scheme: dark) {
    div.video.container div.download-dropdown div.dropdown-content {
      background-color: #444444;
    }
  }
</style>
