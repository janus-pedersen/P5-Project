import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { relations } from '@rfidtool/database/relations';

export const db = (c: Context) => drizzle(c.env.DB, { relations,  });

