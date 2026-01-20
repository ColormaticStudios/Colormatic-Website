# Colormatic Website

[colormatic.org](https://colormatic.org)

This project uses SvelteKit along with TypeScript, Tailwind and Sass. It's configured for static site generation (SSG) and prerendering at compile time to create a simple static website for Nginx to serve, with very little client-side rendering (CSR).

The Colormatic website is developed with accordance to modern web standards, however a legacy website will be available in the future for older/less capable browsers.

To download the project, run:

```
git clone git@git.colormatic.org:ColormaticStudios/Colormatic-Website.git
cd Colormatic-Website
bun install
```

You can run the project locally with:

```
bun run dev
```

Or you can build the project for release with:

```
bun run build
```

After the project has been built, you can preview the release build with:

```
bun run preview
```

Before submitting a push or pull request, run:

```
bun run format
```

To format your code according to the project code format. Remember to never fight the formatter.

[Bootstrap Icons](https://icons.getbootstrap.com/) are licensed under the [MIT](https://opensource.org/license/MIT) license.
