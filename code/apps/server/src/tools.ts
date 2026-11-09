import { Hono } from 'hono';

/**
 * The tool router should be responsible for the following
 * - registering new tags
 * - creating new tools (names, images etc.)
 * - linking tags with tools (1:1 db relation)
 *
 * It should also be responsible for the actualy finding of a tool, and the last known location
 */
export const toolRouter = new Hono()
    .post('/tag', c => {
        // TODO: Create new tags in the database
        return c.text('TODO');
    })
    .post('/', c => {
        // TODO: Create new tools in the database
        return c.text('TODO');
    })
    .put('/link', c => {
        // TODO: Link a tool with a tag
        return c.text('TODO');
    })
    .get('/', c => {
        // TODO: Search for a tool
        return c.text('TODO');
    });
