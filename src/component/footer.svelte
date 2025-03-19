<footer>
  <p>© 2025 Colormatic Studios, All Rights Reserved.</p>
  <p>
    <a href="mailto:support@colormatic.org">support@colormatic.org</a> |
    <a href="mailto:support@colormatic.org">contact@colormatic.org</a>
  </p>
</footer>

<style lang="scss">
  @use "../style/global.scss";

  footer {
    display: flex;
    justify-content: space-between;
    border-top: solid 1px global.$text-color;
    width: 95%;
    padding: 4px;
    margin: 0 auto;
  }

  footer p {
    color: global.$text-color;
    padding: 4px 10%;
  }

  @media screen and (max-width: global.$mobile-width) {
    footer {
      flex-direction: column;
    }
    footer p {
      text-align: center;
      padding: 4px;
      margin: 4px;
    }
  }
</style>
