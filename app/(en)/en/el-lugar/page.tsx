import { LugarPage } from '@/components/pages/LugarPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'lugar');

export default function Page() {
  return <LugarPage locale="en" />;
}
