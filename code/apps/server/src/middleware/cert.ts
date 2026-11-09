import { createMiddleware } from 'hono/factory';

export interface CertInformation {
    deviceCn?: string;
    revoked?: boolean;
    verified?: boolean;
}

export interface CertVariables {
    cert: CertInformation;
}

export const cert = createMiddleware<{ Variables: CertVariables }>(async (c, next) => {
    const cert = c.req.raw.cf?.tlsClientAuth as IncomingRequestCfPropertiesTLSClientAuth;
    const deviceCn = cert?.certSubjectDN
        .split(',')
        .find(dn => dn.startsWith('CN='))
        ?.substring(3);

    c.set('cert', {
        deviceCn,
        revoked: cert?.certRevoked === '1',
        verified: cert?.certVerified === 'SUCCESS'
    });

    await next();
});
