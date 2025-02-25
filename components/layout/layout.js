import MainNavigation from '@/components/layout/main-navigation';

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}
