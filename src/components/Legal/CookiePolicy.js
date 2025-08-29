import React from 'react';
import './CookiePolicy.css';

const CookiePolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Politique des Cookies</h1>
          <p className="legal-date">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        
        <div className="legal-content">
          <section>
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) 
              lorsque vous visitez un site web. Les cookies permettent au site web de mémoriser vos actions et 
              préférences sur une période donnée.
            </p>
          </section>

          <section>
            <h2>2. Comment nous utilisons les cookies</h2>
            <p>
              AmeenTECH utilise des cookies pour améliorer votre expérience sur notre site web, 
              analyser le trafic et personnaliser le contenu. Nous utilisons différents types de cookies :
            </p>
          </section>

          <section>
            <h2>3. Types de cookies que nous utilisons</h2>
            
            <h3>Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont essentiels au fonctionnement de notre site web. Ils vous permettent de naviguer 
              sur le site et d'utiliser ses fonctionnalités de base.
            </p>
            <ul>
              <li>Cookies de session pour maintenir votre connexion</li>
              <li>Cookies de sécurité pour protéger contre les attaques</li>
              <li>Cookies de préférences linguistiques</li>
            </ul>

            <h3>Cookies de performance</h3>
            <p>
              Ces cookies collectent des informations sur la façon dont vous utilisez notre site web, 
              comme les pages que vous visitez le plus souvent.
            </p>
            <ul>
              <li>Google Analytics pour analyser le trafic du site</li>
              <li>Cookies de temps de chargement des pages</li>
              <li>Cookies d'erreurs techniques</li>
            </ul>

            <h3>Cookies de fonctionnalité</h3>
            <p>
              Ces cookies permettent au site web de se souvenir des choix que vous faites et de fournir 
              des fonctionnalités améliorées et personnalisées.
            </p>
            <ul>
              <li>Préférences de thème (mode sombre/clair)</li>
              <li>Informations de contact sauvegardées</li>
              <li>Préférences de langue et région</li>
            </ul>

            <h3>Cookies de marketing</h3>
            <p>
              Ces cookies sont utilisés pour vous présenter des publicités pertinentes et mesurer 
              l'efficacité de nos campagnes marketing.
            </p>
            <ul>
              <li>Cookies de réseaux sociaux (Facebook, LinkedIn)</li>
              <li>Cookies de remarketing Google Ads</li>
              <li>Cookies de suivi de conversion</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies tiers</h2>
            <p>Nous utilisons des services tiers qui peuvent placer des cookies sur votre appareil :</p>
            <ul>
              <li><strong>Google Analytics :</strong> Pour analyser l'utilisation du site</li>
              <li><strong>Google Fonts :</strong> Pour charger les polices web</li>
              <li><strong>Réseaux sociaux :</strong> Pour intégrer les boutons de partage</li>
              <li><strong>Services de chat :</strong> Pour le support client en ligne</li>
            </ul>
          </section>

          <section>
            <h2>5. Durée de conservation</h2>
            <p>La durée de conservation des cookies varie selon leur type :</p>
            <ul>
              <li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
              <li><strong>Cookies persistants :</strong> Conservés de 30 jours à 2 ans maximum</li>
              <li><strong>Cookies analytiques :</strong> Conservés jusqu'à 26 mois</li>
              <li><strong>Cookies marketing :</strong> Conservés jusqu'à 13 mois</li>
            </ul>
          </section>

          <section>
            <h2>6. Gestion de vos préférences</h2>
            <p>Vous pouvez gérer vos préférences de cookies de plusieurs façons :</p>
            
            <h3>Paramètres du navigateur</h3>
            <p>
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. 
              Consultez l'aide de votre navigateur pour plus d'informations.
            </p>

            <h3>Outils de désinscription</h3>
            <ul>
              <li><strong>Google Analytics :</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="legal-link">Opt-out Google Analytics</a></li>
              <li><strong>Publicités Google :</strong> <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="legal-link">Paramètres des annonces</a></li>
            </ul>

            <h3>Panneau de préférences</h3>
            <p>
              Vous pouvez également gérer vos préférences via notre panneau de configuration des cookies 
              disponible en bas de cette page.
            </p>
          </section>

          <section>
            <h2>7. Impact du refus des cookies</h2>
            <p>
              Si vous choisissez de désactiver certains cookies, cela peut affecter le fonctionnement 
              de notre site web :
            </p>
            <ul>
              <li>Certaines fonctionnalités peuvent ne pas fonctionner correctement</li>
              <li>Vos préférences ne seront pas sauvegardées</li>
              <li>Vous pourriez voir du contenu moins pertinent</li>
              <li>Les formulaires de contact pourraient nécessiter une re-saisie</li>
            </ul>
          </section>

          <section>
            <h2>8. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique des cookies périodiquement. 
              Toute modification sera publiée sur cette page avec la date de mise à jour.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies, contactez-nous :
            </p>
            <p>
              <strong>Email :</strong> contact@ameenaltech.com<br />
              <strong>Adresse :</strong> Cite Soprim, En face BRT(Arret Police Parcelle)<br />
              <strong>Téléphone :</strong> +221 772050626
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;