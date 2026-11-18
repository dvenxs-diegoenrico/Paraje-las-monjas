import type { IconName } from '@/components/base/Icon';

export function spaceIcon(name: string): IconName {
  if (/Pilares|Pillars/.test(name)) return 'arco';
  if (/Cristal|Glass/.test(name)) return 'pabellon';
  if (/Arbolado/.test(name)) return 'arbol';
  return 'cipres';
}
