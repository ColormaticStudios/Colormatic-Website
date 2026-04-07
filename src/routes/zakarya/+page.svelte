<script lang="ts">
  import { dev } from "$app/environment";
  import { onMount } from "svelte";
  import Hero from "$lib/components/hero.svelte";
  import Divider from "$lib/components/divider.svelte";
  import Linktree from "$lib/components/linktree.svelte";
  import Spacer from "$lib/components/spacer.svelte";
  import { parseRssPosts, type RssPost } from "$lib/utils/rss";

  // TODO: Localization
  const BLOG_URL = "https://library.colormatic.org/en/zakarya/";
  const BLOG_RSS_URL = "https://library.colormatic.org/en/zakarya/index.xml";

  let blogPosts = $state<RssPost[]>([]);
  let blogLoading = $state(true);
  let blogLoadFailed = $state(false);

  onMount(() => {
    const abortController = new AbortController();

    async function loadBlogPosts() {
      if (dev) {
        const { devBlogPosts } = await import("$lib/data/placeholder-blog");

        blogPosts = devBlogPosts;
        blogLoadFailed = false;
        blogLoading = false;
        return;
      }

      try {
        const response = await fetch(BLOG_RSS_URL, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Zakarya RSS feed: ${response.status} ${response.statusText}`,
          );
        }

        blogPosts = parseRssPosts(await response.text());
        blogLoadFailed = false;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(error);
        blogPosts = [];
        blogLoadFailed = true;
      } finally {
        blogLoading = false;
      }
    }

    void loadBlogPosts();

    return () => {
      abortController.abort();
    };
  });
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
    content="https://colormatic.org/img/colormatic_logo.svg"
  />
  <meta property="og:url" content="https://colormatic.org/zakarya/" />
  <meta property="og:type" content="website" />
</svelte:head>

<main>
  <img
    class="mx-auto mt-8 mb-8 block w-[95%] rounded-2xl border border-[#00000033]
    shadow-[1px_1px_8px_#00000033] lg:w-[70%]"
    src="/img/zakarya-banner.webp"
    alt="Zakarya Banner"
    srcset="/img/zakarya-banner.webp 960w, /img/zakarya-banner@2x.webp 1920w"
  />
  <Hero class="flex flex-col flex-wrap items-center lg:flex-row">
    <div class="flex grow lg:flex-col">
      <img
        src="/img/zakarya-icon.webp"
        class="mx-4 my-2 block h-9.5 rounded-xl lg:mx-auto lg:h-auto lg:w-25 lg:rounded-2xl"
        alt="Zakarya Icon"
        srcset="/img/zakarya-icon.webp 540w, /img/zakarya-icon@2x.webp 1080w"
      />
      <span class="text-[200%]">Zakarya</span>
    </div>

    <div
      class="m-3 h-fit rounded-2xl border border-[#00000033] p-4 text-left text-[120%] lg:max-w-1/2
      dark:border-[#ffffff33]"
    >
      <p class="mb-4">
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

    <div class="w-[60%] grow lg:w-[unset]">
      <Linktree
        links={[
          {
            url: "https://git.colormatic.org/zakarya",
            label: "Colormatic Git",
            icon: "git",
            color: "#316996",
          },
          {
            url: "https://mstdn.party/@zakarya",
            label: "Mastodon",
            icon: "mastodon",
            color: "#6364FF",
          },
          {
            url: "https://bsky.app/profile/zakarya.colormatic.org",
            label: "Bluesky",
            icon: "bluesky",
            color: "#0085FF",
          },
          {
            url: "https://ko-fi.com/zakarya",
            label: "Ko-fi",
            icon: "cup-hot-fill",
            color: "#FF6433",
          },
          {
            url: "https://www.youtube.com/@czakarya",
            label: "Youtube",
            icon: "youtube",
            color: "#FF0031",
          },
          {
            url: "https://github.com/CZakarya",
            label: "GitHub",
            icon: "github",
            color: "#08872B",
          },
        ]}
      />
    </div>
  </Hero>

  <Hero>
    <span class="text-2xl font-bold">Blog</span>

    <Divider weight="light" />

    {#if blogLoading}
      <p class="justify pt-1">Fetching blog posts...</p>
    {:else if blogLoadFailed}
      <p class="justify pt-1">Blog posts are currently unavailable.</p>
    {:else if blogPosts.length > 0}
      {#each blogPosts as post, index}
        {#if index > 0}
          <Divider weight="light" />
        {/if}

        <article class="text-left">
          <div
            class="flex flex-col gap-1 lg:mx-auto lg:w-[60%] lg:flex-row lg:items-baseline lg:justify-between lg:gap-4"
          >
            <a
              class="flex-3 text-left text-xl font-semibold"
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.title}
            </a>
            <span class="flex-1 lg:text-right text-sm italic opacity-70">
              {post.published}
            </span>
          </div>
          <p class="justify pt-3">{post.description}</p>
        </article>
      {/each}
    {:else}
      <p class="justify pt-1">No blog posts yet.</p>
    {/if}
  </Hero>
</main>

<Spacer />
