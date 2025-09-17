<script lang="ts">
  import Panel from "components/panel.svelte";

  interface Props {
    className?: string;
    children?: import("svelte").Snippet;
  }
  let { className, children }: Props = $props();
</script>

<Panel
  className="mx-auto my-4 p-6 text-center
  w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]
  {className}"
>
  {@render children?.()}
</Panel>
