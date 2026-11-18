import { PrivacidadPage } from '@/components/pages/PrivacidadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('es', 'privacidad');

export default function Page() {
  return <PrivacidadPage locale="es" />;
}
