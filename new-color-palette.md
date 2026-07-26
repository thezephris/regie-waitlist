# Regie Design Tokens (v3.0 - Enterprise)

> **Regie's visual identity is built upon three semantic pillars: Neon Green represents the Platform and user actions, Electric Purple represents Artificial Intelligence, and Deep Space Black provides a distraction-free environment for creators.**

## 🎨 Semantic Color System

Bu sistem, kod tarafında (Tailwind, CSS Variables) ve tasarım tarafında (Figma) tam ölçeklenebilirlik sağlamak üzere "Semantic Token" mantığıyla kurgulanmıştır.

### 1. Surfaces & Backgrounds (The Void)
Tamamen karanlık, odaklanmayı artıran hiyerarşik SaaS arkaplanları.

| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.surface.0` | `#09090B` | Ana arka plan (App Background). |
| `color.surface.1` | `#121215` | Temel kartlar (Base Cards). |
| `color.surface.2` | `#18181B` | Card içinde Card, Elevated (Modal). |
| `color.surface.3` | `#232326` | Hover durumları, Popover, Sidebar. |
| `color.surface.4` | `#2E2E33` | Dropdown, Aktif seçim alanları. |
| `color.border.subtle` | `#27272A` | İnce çizgiler, ayırıcılar (divider). |
| `color.border.hover` | `#3F3F46` | Hover durumundaki input/kart border'ları. |

### 2. Brand & Action (The Engine)
Regie'nin ana karakteri. Tıklanabilir öğeler, başarı durumları, platformun ana hissiyatı.

| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.action.primary` | `#69DC9E` | (Neon Green) Ana CTA butonları, aktif sekmeler, Logo. |
| `color.action.hover` | `#8BE4B6` | Buton hover durumları. |
| `color.action.muted` | `#163A26` | Transparan yeşil arka planlar. |

### 3. Artificial Intelligence (The Intelligence Layer)
Sadece AI özelliklerinde kullanıcıya "burada yapay zeka çalışıyor" hissini vermek için. Regie'nin yönetmen zekası.

| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.ai.accent` | `#8B5CF6` | (Electric Purple) AI butonları, AI Chat baloncukları. |
| `color.ai.glow` | `#A855F7` | Gradient geçişleri veya ışıma efektleri. |

### 4. Status & Feedback (The Pulse)
Gözden kaçmaması gereken anlık bildirimler, uyarılar ve aksiyon durumları.

| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.status.live` | `#FF2D55` | "Canlı" göstergesi, kayıt ışığı (Pembe-Kırmızı). |
| `color.status.success` | `#22C55E` | Başarılı işlemler. |
| `color.status.info` | `#3B82F6` | Bilgilendirmeler. |
| `color.status.warning` | `#F59E0B` | Uyarılar, bekleyen işlemler. |
| `color.status.error` | `#EF4444` | Hatalar (LIVE renginden bağımsız klasik kırmızı). |
| `color.status.destructive.bg`| `#991B1B` | Silme (Delete) butonu arka planı. |
| `color.status.destructive.hover`| `#B91C1C`| Silme butonu hover durumu. |
| `color.status.destructive.text`| `#FFFFFF` | Silme butonu yazı rengi. |

### 5. Charts & Data (The Metrics)
Dashboard'da grafiklerin tek düze olmasını engelleyen veri görselleştirme paleti.

| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.chart.1` | `#22FF66` | Birincil Veriler (Örn: İzleyici sayısı) |
| `color.chart.2` | `#8B5CF6` | AI veya Etkileşim |
| `color.chart.3` | `#3B82F6` | İkincil Metrikler |
| `color.chart.4` | `#F59E0B` | Dikkat Edilmesi Gereken Veriler |
| `color.chart.5` | `#FF2D55` | Kritik Metrikler |
| `color.chart.6` | `#14B8A6` | Ek Veriler |

### 6. Icon Colors
İkonlar metinden farklı bir renk hiyerarşisine sahiptir.

| Semantic Token | Açıklama |
|----------------|----------|
| `color.icon.primary` | Ana ikonlar |
| `color.icon.secondary` | İkincil ikonlar |
| `color.icon.disabled` | Pasif ikonlar |
| `color.icon.brand` | Vurgulu marka ikonları |

---

## 🏗 Component Tokens

### 1. Input Tokens
Form elemanlarının standart davranışları.

| Semantic Token | Açıklama |
|----------------|----------|
| `input.background` | İnput zemin rengi |
| `input.border` | Standart çerçeve |
| `input.focus` | Seçili durum çerçevesi |
| `input.placeholder` | Metin yer tutucu |
| `input.text` | Yazılan metin |
| `input.error` | Hatalı giriş durumu |
| `input.success`| Başarılı giriş durumu |

### 2. Button Tokens
Buton tiplerinin standartlaştırılması.

| Semantic Token | Açıklama |
|----------------|----------|
| `button.primary` | Ana aksiyon (Neon Green) |
| `button.secondary` | İkincil aksiyon |
| `button.ghost` | Zemin rengi olmayan |
| `button.outline` | Sadece çerçeve |
| `button.destructive`| Silme/Tehlikeli aksiyon |
| `button.ai` | Yapay Zeka tetikleyici |

---

## 📏 Core Scales & Values

### 1. Opacity Tokens
Saydamlık değerleri için standart değişkenler.

| Token | Değer |
|-------|-------|
| `opacity.100` | `1` |
| `opacity.80` | `.80` |
| `opacity.60` | `.60` |
| `opacity.40` | `.40` |
| `opacity.24` | `.24` |
| `opacity.16` | `.16` |
| `opacity.12` | `.12` |
| `opacity.08` | `.08` |
| `opacity.04` | `.04` |

### 2. Spacing Scale
Figma ve Tailwind'in 4pt sistemine tam uyumlu boşluk ölçeği.

| Token | Değer (px) | Token | Değer (px) |
|-------|------------|-------|------------|
| `space.1` | 4px | `space.6` | 24px |
| `space.2` | 8px | `space.8` | 32px |
| `space.3` | 12px | `space.10` | 40px |
| `space.4` | 16px | `space.12` | 48px |
| `space.5` | 20px | `space.16` | 64px |

### 3. Typography Scale & Colors
Hiyerarşik metin boyutlandırması ve renkleri.

**Colors:**
| Semantic Token | Hex | Kullanım Alanı |
|----------------|-----|----------------|
| `color.text.primary` | `#FAFAFA` | Başlıklar, vurgulu metinler. |
| `color.text.secondary`| `#A1A1AA` | Paragraflar, ikincil bilgiler. |
| `color.text.muted` | `#52525B` | Placeholder, inaktif öğeler. |

**Scale (Boyutlar):**
`Display XL`, `Display`, `Heading XL`, `Heading`, `Title`, `Subtitle`, `Body LG`, `Body`, `Caption`, `Label`, `Code`

### 4. Radius (Köşe Yuvarlama)
| Token | Değer (px) |
|-------|------------|
| `radius.sm` | 8px |
| `radius.md` | 12px |
| `radius.lg` | 16px |
| `radius.xl` | 24px |
| `radius.full` | 9999px |

### 5. Z-Index
Katman hiyerarşisi, çakışmaları engellemek için.

| Token | Değer |
|-------|-------|
| `z.base` | 0 |
| `z.dropdown` | 100 |
| `z.sticky` | 200 |
| `z.modal` | 400 |
| `z.toast` | 500 |
| `z.tooltip` | 600 |

### 6. Shadows
Derinlik ve ışıma efektleri.

| Token | Açıklama |
|-------|----------|
| `shadow.sm` | Kart içi küçük öğeler |
| `shadow.md` | Standart dropdown / popover |
| `shadow.lg` | Modallar |
| `shadow.glow.brand`| Marka rengi ışıması |
| `shadow.glow.ai` | Yapay Zeka ışıması |
| `shadow.glow.live` | Canlı yayın göstergesi ışıması |

### 7. Motion & Easing
Animasyon ve geçiş süreleri.

**Motion (Duration):**
| Token | Değer |
|-------|-------|
| `motion.fast` | 150ms |
| `motion.normal` | 250ms |
| `motion.slow` | 400ms |

**Easing:**
`ease.out`, `ease.in`, `ease.inOut`, `spring.default`

---

## 💅 Accessibility, Effects & Premium Details

### Focus Ring (Erişilebilirlik)
Input veya butonlar Tab ile veya fare ile seçildiğinde görünmesi gereken Focus çerçevesi.
```css
/* opacity.40 kullanılarak */
box-shadow: 0 0 0 2px rgba(105, 220, 158, var(--opacity-40));
```

### Selection Color (Metin Seçimi)
Kullanıcı metni fare ile taradığında Premium hissi vermek için.
```css
::selection {
  background-color: rgba(105, 220, 158, 0.18);
  color: #FAFAFA;
}
```

### Scrollbar
```css
::-webkit-scrollbar-track {
  background: var(--color-surface-1);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border-hover);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}
```

### Gradients

**Brand Gradient** (Hero alanları için çok premium görünüm):
```css
background: linear-gradient(135deg, #69DC9E 0%, #50B37B 100%);
```

**AI Gradient** (Sihir efektini çok daha canlı ve dinamik gösteren geçiş):
```css
background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 45%, #C084FC 100%);
```

### Glassmorphism (Bulanık Zeminler)
Üst barlar ve sticky (sabit) header'lar için:
```css
background: rgba(9, 9, 11, var(--opacity-80)); /* Gerçekçi bulanıklık */
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255, 255, 255, var(--opacity-04));
```

### Neon Glows (Işıma Efekti)
Sadece gerçekten dikkat çekmesi gereken yerlerde:
```css
/* LIVE Indicator Glow (shadow.glow.live) */
box-shadow: 0 0 16px rgba(255, 45, 85, var(--opacity-40));

/* Brand Button Glow (shadow.glow.brand) */
box-shadow: 0 0 20px rgba(105, 220, 158, var(--opacity-24));
```
