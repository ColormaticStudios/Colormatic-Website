<script lang="ts">
  import "../style/main.scss";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import Navbar from "../component/navbar.svelte";
  import Footer from "../component/footer.svelte";

  import { createBackground } from "../script/bg.ts";
  import { onMount } from "svelte";

  onMount(createBackground);
</script>

<svelte:head>
  <link rel="icon" href="/img/colormatic_logo.svg" />
  <!--<link rel="stylesheet" href="../style/main.scss" />-->
</svelte:head>

<Navbar />

<slot />

<Footer />
