// Feste Icon-Liste der Website – gehört WP-03 (Design-System).
// Nur diese Icons werden benutzt. Ein neues Icon ist eine Spec-Änderung (siehe CONTRIBUTING.md).
// Quelle: Lucide (https://lucide.dev), beim Build als Inline-SVG gerendert, keine externen Requests.
import ArrowLeft from '@lucide/astro/icons/arrow-left';
import ArrowRight from '@lucide/astro/icons/arrow-right';
import CalendarCheck from '@lucide/astro/icons/calendar-check';
import Check from '@lucide/astro/icons/check';
import ChevronDown from '@lucide/astro/icons/chevron-down';
import CircleCheck from '@lucide/astro/icons/circle-check';
import ClipboardList from '@lucide/astro/icons/clipboard-list';
import Code from '@lucide/astro/icons/code';
import ExternalLink from '@lucide/astro/icons/external-link';
import Globe from '@lucide/astro/icons/globe';
import Hammer from '@lucide/astro/icons/hammer';
import Mail from '@lucide/astro/icons/mail';
import Menu from '@lucide/astro/icons/menu';
import MessageCircle from '@lucide/astro/icons/message-circle';
import Phone from '@lucide/astro/icons/phone';
import Rocket from '@lucide/astro/icons/rocket';
import Sparkles from '@lucide/astro/icons/sparkles';
import TabletSmartphone from '@lucide/astro/icons/tablet-smartphone';
import X from '@lucide/astro/icons/x';

export const icons = {
  // Leistungen L1–L4 (WP-05)
  globe: Globe,
  'tablet-smartphone': TabletSmartphone,
  sparkles: Sparkles,
  code: Code,
  // Ablauf, Schritte 1–4 (WP-07)
  'message-circle': MessageCircle,
  'clipboard-list': ClipboardList,
  hammer: Hammer,
  rocket: Rocket,
  // Kontakt (WP-08)
  mail: Mail,
  phone: Phone,
  'calendar-check': CalendarCheck,
  'circle-check': CircleCheck,
  // Navigation (WP-04)
  menu: Menu,
  x: X,
  // Allgemein
  'external-link': ExternalLink,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  check: Check,
  'chevron-down': ChevronDown,
} as const;

export type IconName = keyof typeof icons;
