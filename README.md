# AppKit + Wagmi test app

This repo use AppKit with wagmi (Vite + React)

AppKit has support for Wagmi and Ethers v6 on Ethereum, @solana/web3.js on Solana and Bitcoin.

This repo was pre-configured with a projectId that will only work on localhost. If you just want to get started, you can skip the next section.

To fully configure your custom project, please obtain a projectId from the Reown Cloud Dashboard and update the `.env` file.

## Project ID

1. Go to [Reown Cloud](https://cloud.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`

## Development

1. Run `pnpm install` to install dependencies
2. Run `pnpm run dev` to start the development server

## Resources

- [AppKit — Docs](https://docs.reown.com/appkit/overview)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
