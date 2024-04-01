import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { josefin_sans } from "~/styles/fonts";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

import "~/styles/globals.css";
import "react-datetime/css/react-datetime.css";

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  PageTransitionEvent,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const component = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session as Session} refetchOnWindowFocus={false}>
      <Toaster />
      <main className={`font-sans ${josefin_sans.variable}`}>{component}</main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
