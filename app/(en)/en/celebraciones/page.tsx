import { CelebracionesPage } from '@/components/pages/CelebracionesPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'celebraciones');

export default function Page() {
  return <CelebracionesPage locale="en" />;
}
