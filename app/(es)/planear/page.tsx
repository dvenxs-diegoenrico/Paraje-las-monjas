import { PlanearPage } from '@/components/pages/PlanearPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('es', 'planear');

export default function Page() {
  return <PlanearPage locale="es" />;
}
