<script lang="ts">
  import Panel from "$lib/components/panel.svelte";

  interface Props {
    class?: string;
    children?: import("svelte").Snippet;
  }
  let { class: classProp, children }: Props = $props();
</script>

<Panel
  class="mx-auto my-4 w-[95%] p-6 text-center sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]
  {classProp}"
>
  {@render children?.()}
</Panel>
