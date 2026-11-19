import { z } from 'zod';

export const CELEBRATION_TYPES = ['boda', 'boda-intima', 'familiar', 'jornada', 'otra'] as const;
export const BUDGETS = ['lt-25', '25-50', '50-100', '100-250', '250-plus', 'undecided'] as const;
export const VISIT_PREFS = ['entre-semana', 'sabado', 'sin-preferencia'] as const;

const trimmed = (max: number) => z.string().trim().max(max);

/** Error codes map to localized messages in content/*.ts → form.errors. */
export const inquirySchema = z
  .object({
    locale: z.enum(['es', 'en']).default('es'),
    name: trimmed(120).min(1, 'name'),
    email: z.union([z.literal(''), z.string().trim().max(200).email('email')]).default(''),
    phone: z.union([z.literal(''), z.string().trim().max(40).regex(/^[+\d][\d\s().-]{6,}$/, 'phone')]).default(''),
    type: z.enum(CELEBRATION_TYPES).optional().catch(undefined),
    guests: z.union([z.literal(''), z.coerce.number({ message: 'guests' }).int('guests').min(1, 'guests').max(2000, 'guests')]).default(''),
    // refine (not enum) so a missing budget does not stop the other checks from reporting
    budget: z.string().refine((v) => (BUDGETS as readonly string[]).includes(v), { message: 'budget' }),
    date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'date'),
    visit: z.enum(VISIT_PREFS).optional().catch(undefined),
    message: trimmed(2000).default(''),
  })
  .superRefine((v, ctx) => {
    if (!v.email && !v.phone) ctx.addIssue({ code: 'custom', path: ['contact'], message: 'contact' });
  });

export type Inquiry = z.infer<typeof inquirySchema>;
export type FieldErrorKey = 'name' | 'contact' | 'email' | 'phone' | 'date' | 'guests' | 'budget';

export type InquiryState = {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<FieldErrorKey, FieldErrorKey>>;
  formError?: 'generic' | 'rate' | 'captcha' | 'unavailable';
  values?: Record<string, string>;
};
