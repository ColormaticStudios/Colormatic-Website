<script lang="ts">
  import Panel from "components/panel.svelte";

  interface Props {
    className?: string;
    children?: import("svelte").Snippet;
  }
  let { className, children }: Props = $props();
</script>

<Panel
  className="mx-auto my-4 w-[90%] lg:w-[60%] p-6 text-center
  {className}"
>
  {@render children?.()}
</Panel>
