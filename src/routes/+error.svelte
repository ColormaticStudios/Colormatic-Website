<script lang="ts">
  import { page } from "$app/state";
</script>

<main>
  <spacer></spacer>

  <div class="heading">{page.status} {(page.error as App.Error).message}</div>

  <spacer></spacer>
</main>
