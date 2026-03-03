<script lang="ts">
  interface Props {
    className?: string;
    links: {
      label: string;
      url: string;
      icon?: string;
      color?: string;
    }[];
  }
  let { className, links }: Props = $props();
</script>

<ul class={className}>
  {#each links as link}
    <li class="my-3 text-center">
      <a
        class="box-border inline-block w-full rounded-full px-4 py-2 no-underline
        shadow-[2px_2px_4px_#00000066] transition duration-500 hover:bg-[#383c3f]"
        style:background-color={link.color ?? "#4c5053"}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {#if link.icon}
          <i class="bi bi-{link.icon} float-left"></i>
        {/if}
        {link.label}
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  /*/
   * This may look out of place, but the background color of the links
   * in the link tree don't change based on light/dark theme. The text
   * color of the links should always be white.
  /*/
  ul li a {
    color: white;
  }
</style>
