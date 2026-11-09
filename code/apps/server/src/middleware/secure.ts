import { createMiddleware } from "hono/factory";
import { CertInformation } from "./cert";

interface SecureVariables {
    cert: Required<CertInformation>;
}

export const secure = createMiddleware<{Variables: SecureVariables}>(async (c, next) => {
    const certificate = c.get('cert') as Required<CertInformation>;
    if (!certificate.verified || certificate.revoked) {
        return c.text('Unauthorized', 401);
    }

    await next();
});
