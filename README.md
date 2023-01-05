<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://cavies.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5be89023-c777-4dc5-98ac-85d6c495bf94%2FUntitled.png?id=fd02a538-44bd-4a81-9dc9-3e4b854875be&table=block&spaceId=4b980001-ecea-4d73-93d4-792b10d7fa1a&width=2000&userId=&cache=v2">
  </a>
</p>

<h1 align="center">HamsterSwap SDK</h1>

<div align="center">

Trustless peer-to-peer (P2P) protocol for swapping digital collectibles and assets.
Supports both on-chain and off-chain.

</div>

## ✨ Features

- 🌈 Authentication with HamsterBox server.
- 📦 Swap collectibles and assets.
- 📦 Collectibles and assets managment.

## 🖥 Environment Support

- Modern browsers and Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                                      |

## 📦 Install

```bash
npm install @hamsterbox/swap
```

```bash
yarn add @hamsterbox/swap
```

## 🔨 Usage


There is three main flow usage of SDK

1. Login

```jsx
  import { initHamsterSwap, Network } from "@hamsterbox/swap";
  import { useWallet } from "@solana/wallet-adapter-react";

  const wallet = useWallet();

  const hamsterSwapSdk = initHamsterSwap({
    walletProvider: wallet,
    network: Network.devnet || Network.mainnet,
  });

```


2. Login

```jsx
  import { SIGN_MESSAGE, useHamsterSwap } from "@hamsterbox/swap";

  const solanaWallet = useSolana();

  /** Need initilize first before using sdk. */
  const hamsterSwapSdk = useHamsterSwap();

 /** Sign message to get signature. */
  const signature = await signMessage(SIGN_MESSAGE);

  /** Call function to sign message in wallet and login firebase hamsterbox server. */
  const user = await authService.signInWithWallet(
    wallet?.publicKey?.toString(),
    signature
  );

```

```

# Notes

This library is still in beta development. Significant changes may happen anytime.

# Contact

If you have any inquiries please send emails to dev@cavies.xyz.

## License
 
The MIT License (MIT)

Copyright (c) 2022 CaviesLabs.