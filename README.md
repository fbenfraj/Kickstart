# Kickstarter Solidity Contract

Kickstarter clone on Ethereum blockchain that allows users to start a campaign through a campaign factory and to get contributers that will vote spending requests.

## Getting Started

### Dependencies

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installing

1. Clone the repo
    ```sh
    git clone https://github.com/fbenfraj/kickstarter-contract
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. In deploy.js file, replace HDWalletProvider arguments with your own mnemonic phrase and Infura endpoint.
    ```
     const provider = new HDWalletProvider(
         // your own mnemonic phrase,
         // your own Infura endpoint
     );
    ```

### Executing program

-   Deploy the contract on the Rinkeby network
    ```
      node ethereum/deploy.js
    ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

Contributors names and contact info

BEN FRAJ Farouk - [@f_benfraj](https://twitter.com/f_benfraj) - farouk.ben-fraj@outlook.com
Project Link: [https://github.com/fbenfraj/kickstarter-contract](https://github.com/fbenfraj/kickstarter-contract)
