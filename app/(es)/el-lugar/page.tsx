import { LugarPage } from '@/components/pages/LugarPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('es', 'lugar');

export default function Page() {
  return <LugarPage locale="es" />;
}
