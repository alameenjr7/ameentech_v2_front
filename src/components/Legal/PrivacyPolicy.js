import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Politique de Confidentialité</h1>
          <p className="legal-date">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        
        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              AmeenTECH s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous 
              collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre site web.
            </p>
          </section>

          <section>
            <h2>2. Informations que nous collectons</h2>
            <h3>Informations personnelles</h3>
            <p>Nous pouvons collecter les informations suivantes :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Entreprise et poste occupé</li>
              <li>Adresse postale</li>
            </ul>
            
            <h3>Données techniques</h3>
            <ul>
              <li>Adresse IP</li>
              <li>Type de navigateur et version</li>
              <li>Système d'exploitation</li>
              <li>Pages visitées et temps passé sur le site</li>
              <li>Données de géolocalisation approximative</li>
            </ul>
          </section>

          <section>
            <h2>3. Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations personnelles pour :</p>
            <ul>
              <li>Répondre à vos demandes de contact et devis</li>
              <li>Fournir nos services de développement logiciel</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
              <li>Analyser l'utilisation de notre site web</li>
            </ul>
          </section>

          <section>
            <h2>4. Base légale du traitement</h2>
            <p>Nous traitons vos données personnelles sur la base de :</p>
            <ul>
              <li>Votre consentement explicite</li>
              <li>L'exécution d'un contrat</li>
              <li>Nos intérêts légitimes commerciaux</li>
              <li>Le respect d'obligations légales</li>
            </ul>
          </section>

          <section>
            <h2>5. Partage de vos informations</h2>
            <p>
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
              Nous pouvons partager vos informations uniquement dans les cas suivants :
            </p>
            <ul>
              <li>Avec votre consentement explicite</li>
              <li>Avec nos prestataires de services de confiance</li>
              <li>Pour respecter une obligation légale</li>
              <li>Pour protéger nos droits et notre sécurité</li>
            </ul>
          </section>

          <section>
            <h2>6. Sécurité des données</h2>
            <p>
              Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
              vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
            </p>
          </section>

          <section>
            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos informations personnelles pendant la durée nécessaire aux fins pour lesquelles 
              elles ont été collectées, conformément à nos obligations légales et commerciales.
            </p>
          </section>

          <section>
            <h2>8. Vos droits</h2>
            <p>Conformément au RGPD, vous avez le droit de :</p>
            <ul>
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données inexactes</li>
              <li>Demander l'effacement de vos données</li>
              <li>Limiter le traitement de vos données</li>
              <li>Vous opposer au traitement</li>
              <li>Portabilité de vos données</li>
              <li>Retirer votre consentement</li>
            </ul>
          </section>

          <section>
            <h2>9. Cookies et technologies similaires</h2>
            <p>
              Notre site web utilise des cookies pour améliorer votre expérience. 
              Consultez notre <a href="/cookie-policy" className="legal-link">Politique des Cookies</a> pour plus d'informations.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :
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

export default PrivacyPolicy;