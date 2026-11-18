import { GaleriaPage } from '@/components/pages/GaleriaPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('es', 'galeria');

export default function Page() {
  return <GaleriaPage locale="es" />;
}
