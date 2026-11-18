import { VisitaPage } from '@/components/pages/VisitaPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('es', 'visita');

export default function Page() {
  return <VisitaPage locale="es" />;
}
