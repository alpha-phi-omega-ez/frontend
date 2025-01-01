# APOEZ frontend website

This website displays information on the Alpha Phi Omega, Epsilon Zeta Chapter at Rensselaer Polytechnic Institute in Troy. NY. It also has functionality to run the campus Lost and Found, a public backtest catalog, and a charger and technology borrowing service.

Originally, it used a template for creating applications using Next.js 14 (pages directory) and NextUI (v2). Now the application is on Next.js 15

>Note: Since Next.js 14, the pages router is recommend migrating to the [new App Router](https://nextjs.org/docs/app) to leverage React's latest features. Currently, the app uses the pages router but plans to transition are in the future

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-pages-template/blob/main/LICENSE).
