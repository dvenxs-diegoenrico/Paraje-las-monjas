import { PlanearPage } from '@/components/pages/PlanearPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'planear');

export default function Page() {
  return <PlanearPage locale="en" />;
}
