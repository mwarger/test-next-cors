// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@test-next-cors/trpc-server';

export const trpc = createTRPCReact<AppRouter>();
