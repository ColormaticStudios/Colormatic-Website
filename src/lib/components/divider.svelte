<script lang="ts">
  interface Props {
    weight?: "heavy" | "light";
  }
  let { weight }: Props = $props();

  // We are intentionally only tracking the initial value of weight
  // svelte-ignore state_referenced_locally
  if (!weight) {
    weight = "heavy";
  }
</script>

<span
  class="m-6 block border-t {weight === 'heavy'
    ? 'border-t-(--text-color)'
    : 'border-[#00000033] dark:border-[#ffffff33]'}"
></span>
