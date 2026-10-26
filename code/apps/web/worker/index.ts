export default {
    fetch(request, env) {
        const url = new URL(request.url);

        // Redirect all `/api` requests to the server worker
        if (url.pathname.startsWith('/api')) {
            // Remove `/api` prefix
            url.pathname = url.pathname.replace(/^\/api(?=\/|$)/, '') || '/';

            return env.SERVER.fetch(new Request(url, request));
        }

        return new Response(null, { status: 404 });
    }
} satisfies ExportedHandler<Env>;
