'use client';

import LoginPage from '../dang-nhap/page';

export default function RegisterPage() {
    // We can reuse the LoginPage component but we need it to default to register mode.
    // Since LoginPage doesn't accept props for default mode, I'll just copy-paste and adjust
    // or better, I'll modify LoginPage to accept a defaultMode prop.
    return <LoginPage defaultMode="register" />;
}
