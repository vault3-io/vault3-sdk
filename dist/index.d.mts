import * as react from 'react';

declare function HelloWorld({ name }: {
    name: string | undefined;
}): string;

declare function Bootstrap({ children }: {
    children: React.ReactNode;
}): react.JSX.Element;

declare function WalletConnect(props: any): react.JSX.Element;

export { HelloWorld, Bootstrap as Vault3Provider, WalletConnect };
