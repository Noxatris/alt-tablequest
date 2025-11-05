"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const circleRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {

    const sections = sectionsRef.current;
    if (sections.length === 0) return;

    // --- 1. Animation du Cercle (Rotation Syncro) ---
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: 5,
        },
      });
    }

    // --- 2. HERO : Fade et Montée Réversible ---
    const hero = sections[0];
    if (hero) {
      gsap.fromTo(
        hero,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -200,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 5,
          },
        }
      );
    }

    // --- 3. Vidéo : Fade + In/Out | Scale In au passage ---
    if (videoRef.current) {
      const videoEl = videoRef.current;
      const target = videoEl.closest('.relative.my-16');

      gsap.fromTo(
        target,
        {
          opacity: 0,
          scale: 0.75
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    }

    // --- 4. SECTIONS Séquentielles avec Pinning (après la HERO) ---
    // On prend toutes les sections à partir de la 2ème (index 1) : Concept & Lore, puis toutes les parties du Résumé.
    const sectionsToPin = sections.slice(1, -1);

    sectionsToPin.forEach((section, index) => {


      // La hauteur de la section est utilisée comme base de la pause/lecture.
      // On convertit la hauteur en pixels pour GSAP (valeur par défaut, mais explicite).
      const sectionHeight = section.offsetHeight;
      const transitionScrollDistance = 200; // Définissons la distance de défilement pour la phase de transition (entrée + sortie).

      // Le total du défilement épinglé est : 
      // (Distance pour l'Entrée) + (Hauteur de la section pour la Lecture) + (Distance pour la Sortie)
      const pinEndValue = `+=${sectionHeight + (transitionScrollDistance * 2)}`;
      const durationTransition = 0.5;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: pinEndValue,
          scrub: 5,
          pin: true,
        },
      });

      // 4.1. Animation d'Entrée (Fade In / Montée)
      tl.fromTo(
        section,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: durationTransition, ease: "power2.out" }
      )

        // 4.2. Phase de Stabilité
        .to(section, {
          duration: sectionHeight / 50, // Durée basée sur la hauteur réelle (ex: 10 pour 500px)
          opacity: 1
        })

        // 4.3. Animation de Sortie (Fade Out / Descente)
        .to(
          section,
          { opacity: 0, y: -10, duration: durationTransition, ease: "power2.in" }
        );
    });

    const lastSection = sections[sections.length - 1]; // Récupère la toute dernière section
    if (lastSection) {
      gsap.fromTo(
        lastSection,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: lastSection,
            start: "top 80%",
            end: "center 50%",
            scrub: 1,
          },
        }
      );
    }

    ScrollTrigger.refresh();

  }, []);

  return (
    <main className="text-white relative overflow-x-hidden bg-black/30 px-8">

      {/* ======== Fond fixe ======== */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/bgProject1.png"
          alt="background outer ring"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ======== Cercle tournant ======== */}
      <div className="fixed inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden sm:overflow-visible"> {/* CHANGEMENT ICI */}
        <div
          ref={circleRef}
          className="relative w-[150vh] h-[150vh] md:w-full md:h-full aspect-square will-change-transform" // CHANGEMENT ICI
        >
          <Image
            src="/bgProject2.png"
            alt="rotating circle"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>


      {/* --- HERO / ACCUEIL (index 0) --- */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="hero-title"
        className="flex flex-col items-center text-center py-32 min-h-[80vh] space-y-6 relative hero-section"
      >

        <h1
          id="hero-title"
          className="text-4xl md:text-8xl font-[Cinzel] font-bold my-12 py-6 
             bg-linear-to-b from-yellow-400 via-[#d8b661] to-black 
             bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
        >
          Table Quest
        </h1>

        <div className="max-w-3xl space-y-8 font-[forum] text-2xl leading-relaxed">
          <p>
            Après un repos bien mérité, la <strong>Compagnie du Racoon</strong> remet le pied à l’étrier !
          </p>

          <p>
            Rendez-vous le <time dateTime="2025-10-30" className="text-[1.1em] text-[#d8b661]">jeudi 13 novembre</time> à <time className="text-[1.1em] text-[#d8b661]">20h</time> pour vivre la suite de ses aventures en direct sur{" "}
            <Link href="/" className="underline hover:text-[#d8b661] transition-all">
              la chaîne Twitch d’AlphaCast
            </Link>.
          </p>

          <p>
            Toujours avec : <strong>AlphaCast (Pok)</strong>, <strong>Angle Droit (Lirith)</strong>, <strong>Antoine Daniel (Jarek)</strong>,{" "}
            <strong>Eventis (Brik)</strong>, <strong>LittleBigWhale (Perceval)</strong>, <strong>ZeratoR (Elliott)</strong> et <strong>Lynkus</strong>, maître du jeu.
          </p>
        </div>

      </section>

      {/* --- VIDÉO --- */}
      <div className="relative my-16 flex justify-center max-w-7xl mx-auto video-section">
        {/* Conteneur du cadre */}
        <div className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-lg shadow-lg">

          {/* Vidéo exactement à l'intérieur du cadre */}
          <video
            ref={videoRef}
            src="/landing.webm"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Cadre au-dessus de la vidéo */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/cadre.webp"
              alt="Cadre"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* --- CONCEPT & LORE (index 1 pour le pinning) --- */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="concept-title"
        className="px-6 py-16 border-t border-white/10 font-[forum] flex flex-col items-center 
               min-h-screen justify-center max-w-4xl mx-auto"
      >
        <h2 id="concept-title" className="text-5xl font-semibold mb-4 font-[Cinzel] text-[#d8b661]">
          Concept et Lore
        </h2>
        <hr className="border-white/30 mb-6" />

        <p className="max-w-4xl leading-relaxed text-xl">
          <strong>Table Quest</strong> est un jeu de rôle en direct sur Twitch porté par <strong>AlphaCast</strong>, entouré de streamers à l’imagination débordante.
          Ensemble, ils vous embarquent dans une aventure immersive et pleine d’humour. Après une première aventure en deux saisons, <strong>Table Quest</strong> revient avec une nouvelle épopée.
          Sous la direction de <strong>Lynkus</strong>, le Maître du jeu, les rôlistes évoluent dans des mondes fantastiques issus de <strong>Donjons & Dragons</strong>, avec une mise en scène soignée et des visuels captivants.
        </p>

        <p className="max-w-4xl leading-relaxed my-8 text-xl">
          En plus de suivre les aventures en temps réel, vous avez la possibilité d’<strong>interagir et d’influencer</strong> le cours des événements pour rendre chaque session unique et imprévisible.
          Que vous soyez novice ou rôliste aguerri, <strong>Table Quest</strong> vous invite à rejoindre un univers où l’improvisation et l’amusement sont toujours au rendez-vous !
        </p>

        <hr className="border-white/30 mt-8" />
      </section>


      <h2 id="campaign-recap-title" className="sr-only">Rappel de la campagne : À la conquête d’Eauprofonde</h2>

      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="recap-intro"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <h2 id="recap-intro-title" className="text-5xl font-semibold mb-16 font-[Cinzel] text-[#d8b661]">
          Rappel de la campagne : À la conquête d’Eauprofonde
        </h2>
        <div className="max-w-4xl leading-relaxed text-xl">
          <p>
            Par notre compagnie quelque peu éreintée, <strong>la pierre de Golorr s’en fut récupérée</strong>.
            La troupe s’en revint dans son fameux repaire afin de s’octroyer un repos mérité… Las, hélas, des zones d’ombre devaient être éclairées.
            Pok s’improvisa donc psy et se mit à l’écoute d’un Perceval hanté par des visions liées à la pierre de Golorr, lorsque parut alors cet inquiétant dragon,
            toujours sous forme humaine… En recherche d’un sceptre, il marqua Pok de près par sa magie perfide avant de s’en aller.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="recap-jarek-xanathar"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <div className="max-w-4xl leading-relaxed space-y-4 text-xl">
          <p>
            Jarek aussi semblait marqué mais par une toute autre entité : Elliott et Lirith, en le voyant, semblaient assez préoccupés…
          </p>
          <p>
            Au petit jour, nouveau danger : <strong>la Guilde de Xanathar s’enquit de menacer le Manoir !</strong>
            La Pierre de Golorr fut ainsi exigée. Pok cacha celle-ci sur un plan éthéré ; Brik en créa une fausse, la remit aux malfrats…
            puis c’est un faux Renaer qui le leur rapporta, après avoir occis ces truands scélérats.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="recap-vajra"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <div className="max-w-4xl leading-relaxed space-y-4 text-xl">
          <p>
            Toujours dans l’ombre du matin, une invitation leur parvint : Gayle, maître de l’académie de magie, convia la fine équipe.
            <strong>Vajra Safahr les accueillit</strong>. Avec un ton énigmatique, Gayle décrivit le théâtre dont les images obsessionnelles tourmentaient Perceval.
            Un sceptre, convoité par le dragon blessé, paraissait protéger cet ancien lieu sacré.
          </p>
          <p>
            Après quelques ergotages, il devint indéniable que Jarek subissait l’emprise manifeste d’une astreinte mentale.
            Il révéla sous la pression un tatouage “goatesque”, symbole d’une servitude chevrotante ou grotesque !
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="recap-theatre"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <div className="max-w-4xl leading-relaxed space-y-4 text-xl">
          <p>
            Dans le théâtre des Sept Masques, Lirith et Elliott s’en furent soudain happés par les feux de la rampe ou mieux : un quiproquo !
            On les force à jouer, c’est une tragédie et comme c’est mauvais, ils sont vite écartés !
            Puis, Perceval ressent en ce lieu animé les vibrations passées de ses visions chtoniennes…
          </p>
          <p>
            Un passage oublié, un escalier sans fin et les voilà bientôt dans un lieu sybillin.
            Gayle incanta alors : la porte s’ouvit sur un décor où un trésor surgit alors.
            Barok Frappemarteau, un nain, les attendit, un brin surpris, devant <strong>les richesses de Dagult Neverember</strong>.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="recap-climax"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <div className="max-w-4xl leading-relaxed space-y-4 text-xl">
          <p>
            Alors la félonie s’incarna plus ou moins : <strong>Gayle se transforma et tua le gardien</strong>.
            Kas, le destructeur, parut fugacement, le Flagelleur mental croisé précédemment, semblait prendre contrôle d’un fatal dénouement :
            Jarek, pris sous sa coulpe, fit feu sur ses alliés. Les piliers de la salle s’écroulaient peu à peu, un dragon corrompu émergea d’un cocon.
            La compagnie subit la vindicte du monstre. Le combat faisait rage, <strong>la compagnie fit front avant que tout s’effondre</strong>.
            Le temps fut suspendu : Jarek avec Elliott, se trouvèrent bloqués dans une cavité, le vil dragon-humain parut tout près de Pok ;
            on vit aussi Renaer et Vajra rejoindre cet endroit… Et dans tout ce chaos, faisant ainsi écho à des desseins tragiques nouant les destinées,
            l’ombre des Perceval semblait s’être invitée… Il fut donc donc <strong>grand temps pour notre compagnie de retourner dans leur douce taverne</strong>
            aux fragrances fleuries d’alcools, de bois, de rats… et d’écureuils aussi ! Bref, Eauprofonde… tout s’acheva à Eauprofonde…
            avant que d’autres mystères n’y abondent !
          </p>
        </div>
      </section>

      {/* --- SOCIAL / PARTENAIRES --- */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current.push(el as HTMLDivElement);
        }}
        aria-labelledby="social-partners"
        className="px-6 py-16 font-[forum] flex flex-col items-center min-h-screen justify-center border-t border-white/10"
      >
        <h2 id="social-partners-title" className="text-5xl font-semibold mb-16 font-[Cinzel] text-[#d8b661]">
          Suivez l'aventure
        </h2>

        <div className="space-y-4 max-w-4xl leading-relaxed text-xl mb-16">
          <p>
            D’ici là, suivez les réseaux sociaux de Table Quest pour découvrir <strong>du contenu exclusif :</strong>
          </p>
          {/* --- Icônes sociales --- */}
          <div className="flex gap-16 mt-6 self-center justify-center">
            <SocialIcon href="/" label="Instagram" icon="instagram" />
            <SocialIcon href="/" label="X" icon="x" />
            <SocialIcon href="/" label="TikTok" icon="tiktok" />
          </div>
        </div>

        {/* LOGOS PARTENAIRES */}
        <h3 className="sr-only">Partenaires</h3>
        <div className="flex flex-wrap justify-center items-center gap-16 py-12 border-t border-white/10 w-full">
          <PartnerLogo src="/sponsor/holy.webp" link="/" alt="Holy" />
          <PartnerLogo src="/sponsor/shopify.webp" link="/" alt="Shopify" />
          <PartnerLogo src="/sponsor/igraal.webp" link="/" alt="iGraal" />
          <PartnerLogo src="/sponsor/dnd.webp" link="/" alt="Dungeons & Dragons" />
        </div>
      </section>
    </main>
  );
}

/* --- Composants internes --- */
function SocialIcon({ href, label, icon }: { href: string; label: string; icon: "instagram" | "x" | "tiktok" }) {
  const icons: Record<string, React.JSX.Element> = {
    instagram: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
    ),
    x: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
    ),
    tiktok: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
    ),
  };

  return (
    <Link
      href={href}
      aria-label={label}
      className="w-18 h-18 flex items-center justify-center rounded-full bg-[#d8b661] text-white hover:bg-white hover:text-[#d8b661] transition"
    >
      {icons[icon]}
    </Link>
  );
}

function PartnerLogo({ src, link, alt }: { src: string; link: string, alt: string }) {
  return (
    <Link href={link} className="relative w-56 h-24">
      <Image src={src} alt={alt} fill className="object-contain" />
    </Link>
  );
}