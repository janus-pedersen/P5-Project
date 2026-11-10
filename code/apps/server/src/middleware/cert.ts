import { createMiddleware } from 'hono/factory';

export interface CertInformation {
    cn?: string;
    revoked?: boolean;
    verified?: boolean;
}

export interface CertVariables {
    cert: CertInformation;
}

export const cert = createMiddleware<{ Variables: CertVariables }>(async (c, next) => {
    const cert = c.req.raw.cf?.tlsClientAuth as IncomingRequestCfPropertiesTLSClientAuth;
    const cn = cert?.certSubjectDN
        .split(',')
        .find(dn => dn.startsWith('CN='))
        ?.substring(3);

    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        console.log('Development mode: skipping certificate verification');
        c.set('cert', {
            cn: 'dev-cn',
            revoked: false,
            verified: true
        });
        await next();
        return;
    }

    c.set('cert', {
        cn: cn,
        revoked: cert?.certRevoked === '1',
        verified: cert?.certVerified === 'SUCCESS'
    });

    await next();
});
