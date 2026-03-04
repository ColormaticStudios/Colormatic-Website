<script lang="ts">
  interface Props {
    class?: string;
    children?: import("svelte").Snippet;
  }
  let { class: classProp, children }: Props = $props();
</script>

<div
  class="rounded-[8px] border border-[#00000033] bg-[#ffffff22] shadow-[1px_1px_8px_#00000033]
  backdrop-blur-[5px] dark:border-[#ffffff33]
  {classProp}"
>
  {@render children?.()}
</div>
