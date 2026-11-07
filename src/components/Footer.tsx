import { site } from '../config/site';
import { footer } from '../content/sections';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LangProvider';
import { asset } from '../lib/asset';
import { ClubLogo } from './ClubLogo';
import { InstagramIcon, LinkedinIcon, MailIcon } from './Icons';

export function Footer() {
  const { t } = useLang();
  const socials = [
    { url: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { url: site.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { url: site.social.email ? `mailto:${site.social.email}` : '', label: 'Email', Icon: MailIcon },
  ].filter((s) => s.url);

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-start">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <img src={asset('images/su-logo-white.webp')} alt={t(ui.university)} width={604} height={170} loading="lazy" className="h-16 w-auto sm:h-20" />
            <span className="hidden h-14 w-px bg-white/20 md:block" aria-hidden="true" />
            <p className="max-w-sm text-lg font-semibold leading-snug text-white/90">{t(footer.supervision)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white">
              <ClubLogo className="w-[78%]" label={t(ui.clubName)} />
            </span>
            <span className="text-start font-extrabold leading-tight">
              {t(ui.clubShort)}
              <span className="block text-sm font-medium text-white/60">{t(ui.tagline)}</span>
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t(ui.clubName)}. {t(footer.rights)}
          </p>
          <ul className="flex items-center gap-2" aria-label={t(footer.follow)}>
            {socials.map(({ url, label, Icon }) => (
              <li key={label}>
                <a
                  href={url}
                  {...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-sun hover:text-sun-ink motion-reduce:transform-none"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
