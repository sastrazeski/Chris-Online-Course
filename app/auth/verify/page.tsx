import Link from "next/link";
import { ArrowLeft, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { resendVerificationCode, verifyEmailCode } from "../actions";

export default async function VerifyEmailPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string; error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const email = params.email ?? "";

  return (
    <>
      <style>{`
        .verify-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 18px;
          background:
            radial-gradient(circle at 15% 10%, rgba(255, 48, 79, 0.13), transparent 28%),
            radial-gradient(circle at 86% 18%, rgba(17, 28, 114, 0.10), transparent 30%),
            linear-gradient(135deg, #ffffff 0%, #f6f8fc 58%, #fff1f3 100%);
          color: #07122d;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .verify-shell {
          width: min(980px, 100%);
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, 0.10);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.86);
          box-shadow: 0 28px 90px rgba(15, 23, 42, 0.14);
          backdrop-filter: blur(18px);
        }

        .verify-aside {
          position: relative;
          min-height: 560px;
          padding: 34px;
          background: #07122d;
          color: #ffffff;
        }

        .verify-aside::after {
          content: "";
          position: absolute;
          inset: auto -60px -90px auto;
          width: 240px;
          height: 240px;
          border-radius: 999px;
          background: rgba(255, 48, 79, 0.82);
          filter: blur(2px);
        }

        .verify-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 12px;
        }

        .verify-brand-mark {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          border-radius: 16px;
          background: #ff304f;
          box-shadow: 0 16px 36px rgba(255, 48, 79, 0.34);
          letter-spacing: 0;
        }

        .verify-aside-copy {
          position: relative;
          z-index: 1;
          margin-top: 92px;
        }

        .verify-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 18px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.10);
          color: #ffb3c0;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .verify-aside h2 {
          margin: 0;
          font-size: clamp(34px, 5vw, 52px);
          line-height: 1.02;
          letter-spacing: 0;
        }

        .verify-aside p {
          max-width: 300px;
          margin: 20px 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 15px;
          line-height: 1.75;
        }

        .verify-card {
          padding: 38px;
          background: rgba(255, 255, 255, 0.94);
        }

        .verify-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #667085;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .verify-icon {
          display: grid;
          width: 58px;
          height: 58px;
          margin-top: 36px;
          place-items: center;
          border-radius: 18px;
          background: #fff1f3;
          color: #ff304f;
        }

        .verify-card h1 {
          margin: 22px 0 0;
          color: #07122d;
          font-size: clamp(30px, 4vw, 44px);
          line-height: 1.05;
          letter-spacing: 0;
        }

        .verify-card-subtitle {
          margin: 14px 0 0;
          color: #667085;
          font-size: 15px;
          line-height: 1.7;
        }

        .verify-alert {
          margin-top: 22px;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
        }

        .verify-alert.success {
          background: #ecfdf3;
          color: #067647;
        }

        .verify-alert.error {
          background: #fff1f3;
          color: #d92d20;
        }

        .verify-form {
          margin-top: 24px;
          display: grid;
          gap: 18px;
        }

        .verify-field {
          display: grid;
          gap: 9px;
          color: #344054;
          font-size: 13px;
          font-weight: 800;
        }

        .verify-input {
          width: 100%;
          height: 54px;
          box-sizing: border-box;
          border: 1px solid #d0d5dd;
          border-radius: 16px;
          background: #ffffff;
          color: #07122d;
          padding: 0 16px;
          font: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .verify-input:focus {
          border-color: #ff304f;
          box-shadow: 0 0 0 5px rgba(255, 48, 79, 0.12);
        }

        .verify-code-input {
          text-align: center;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 0.45em;
        }

        .verify-email-lock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border: 1px solid #ffd3da;
          border-radius: 18px;
          background: #fff7f8;
          padding: 14px 16px;
        }

        .verify-email-label {
          margin: 0 0 4px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .verify-email-value {
          margin: 0;
          max-width: 320px;
          overflow: hidden;
          color: #07122d;
          font-size: 15px;
          font-weight: 900;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .verify-email-badge {
          flex: 0 0 auto;
          border-radius: 999px;
          background: #ff304f;
          color: #ffffff;
          padding: 7px 10px;
          font-size: 11px;
          font-weight: 900;
        }

        .verify-actions {
          display: grid;
          gap: 12px;
          margin-top: 4px;
        }

        .verify-primary,
        .verify-secondary {
          display: inline-flex;
          height: 54px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }

        .verify-primary {
          border: 0;
          background: #ff304f;
          color: #ffffff;
          box-shadow: 0 18px 34px rgba(255, 48, 79, 0.24);
        }

        .verify-secondary {
          width: 100%;
          border: 1px solid #d0d5dd;
          background: #ffffff;
          color: #07122d;
        }

        .verify-primary:hover,
        .verify-secondary:hover {
          transform: translateY(-1px);
        }

        .verify-secondary:hover {
          border-color: #ff304f;
          color: #ff304f;
        }

        .verify-footer {
          margin: 20px 0 0;
          text-align: center;
          color: #667085;
          font-size: 14px;
        }

        .verify-footer a {
          color: #ff304f;
          font-weight: 900;
          text-decoration: none;
        }

        @media (max-width: 820px) {
          .verify-page {
            align-items: start;
            padding: 18px;
          }

          .verify-shell {
            grid-template-columns: 1fr;
            border-radius: 22px;
          }

          .verify-aside {
            min-height: auto;
            padding: 24px;
          }

          .verify-aside-copy {
            margin-top: 42px;
          }

          .verify-aside p {
            max-width: none;
          }

          .verify-card {
            padding: 26px 20px 24px;
          }

          .verify-icon {
            margin-top: 28px;
          }
        }
      `}</style>
      <main className="verify-page">
        <section className="verify-shell" aria-label="Verifikasi email">
          <aside className="verify-aside">
            <div className="verify-brand">
              <span className="verify-brand-mark">RB</span>
              <span>
                Red and Blue
                <br />
                Creative Agency
              </span>
            </div>
            <div className="verify-aside-copy">
              <p className="verify-eyebrow">
                <ShieldCheck size={15} />
                Secure account
              </p>
              <h2>Cek email, masukkan kode.</h2>
              <p>Verifikasi ini memastikan akun dibuat memakai email aktif dan bukan alamat asal-asalan.</p>
            </div>
          </aside>

          <div className="verify-card">
            <Link href="/auth/sign-up" className="verify-back">
              <ArrowLeft size={16} />
              Kembali ke daftar
            </Link>

            <div className="verify-icon">
              <MailCheck size={30} />
            </div>
            <h1>Verifikasi email</h1>
            <p className="verify-card-subtitle">Masukkan kode 6 digit yang dikirim ke email kamu.</p>

            {params.message ? <p className="verify-alert success">{params.message}</p> : null}
            {params.error ? <p className="verify-alert error">{params.error}</p> : null}

            <form action={verifyEmailCode} className="verify-form">
              {email ? (
                <div className="verify-email-lock">
                  <div>
                    <p className="verify-email-label">Email pendaftaran</p>
                    <p className="verify-email-value">{email}</p>
                  </div>
                  <span className="verify-email-badge">Terkunci</span>
                  <input type="hidden" name="email" value={email} />
                </div>
              ) : (
                <label className="verify-field">
                  Email pendaftaran
                  <input name="email" type="email" required placeholder="nama@email.com" className="verify-input" />
                </label>
              )}
              <label className="verify-field">
                Kode verifikasi
                <input
                  name="token"
                  inputMode="numeric"
                  required
                  minLength={6}
                  maxLength={6}
                  placeholder="000000"
                  className="verify-input verify-code-input"
                />
              </label>
              <div className="verify-actions">
                <button className="verify-primary">Verifikasi dan masuk</button>
              </div>
            </form>

            <form action={resendVerificationCode} className="verify-actions">
              <input type="hidden" name="email" value={email} />
              <button className="verify-secondary">
                <RefreshCw size={17} />
                Kirim ulang kode
              </button>
            </form>

            <p className="verify-footer">
              Sudah terverifikasi? <Link href="/auth/sign-in">Login</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
