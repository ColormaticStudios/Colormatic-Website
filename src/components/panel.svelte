<script lang="ts">
  import { getContext } from "svelte";

  let darkTheme: CallableFunction = getContext("darkTheme");

  interface Props {
    className?: string;
    children?: import("svelte").Snippet;
  }
  let { className, children }: Props = $props();
</script>

<div
  class="rounded-[8px] border bg-[#ffffff22]
  shadow-[1px_1px_8px_#00000033] backdrop-blur-[5px]
  {className}
  {darkTheme() ? 'border-[#ffffff33]' : 'border-[#00000033]'}"
>
  {@render children?.()}
</div>
