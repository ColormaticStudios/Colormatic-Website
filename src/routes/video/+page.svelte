<script lang="ts">
  import { getParam, getVideo } from "../../script/video.ts";
  import "../../style/video.scss";

  import { onMount } from "svelte";

  onMount(() => {
    let channel = getParam("c");
    let video = getParam("v");
    // Don't request an empty string
    if (channel && video) {
      getVideo(channel, video);
    }
  });
</script>

<svelte:head>
  <title>Video Player</title>
</svelte:head>

<spacer></spacer>

<main>
  <div class="video container">
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
