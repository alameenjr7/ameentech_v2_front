import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Conditions d'Utilisation</h1>
          <p className="legal-date">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        
        <div className="legal-content">
          <section>
            <h2>1. Acceptation des Conditions</h2>
            <p>
              En accédant et en utilisant le site web d'AmeenTECH, vous acceptez d'être lié par ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site web.
            </p>
          </section>

          <section>
            <h2>2. Description des Services</h2>
            <p>
              AmeenTECH fournit des services de développement logiciel, de conception web, de conseil technique et de solutions digitales. 
              Nous nous réservons le droit de modifier ou d'interrompre nos services à tout moment.
            </p>
          </section>

          <section>
            <h2>3. Utilisation du Site</h2>
            <p>Vous vous engagez à utiliser notre site web uniquement à des fins légales et de manière à ne pas :</p>
            <ul>
              <li>Violer les droits de propriété intellectuelle d'AmeenTECH</li>
              <li>Transmettre du contenu malveillant, offensant ou illégal</li>
              <li>Interférer avec le fonctionnement du site web</li>
              <li>Utiliser des moyens automatisés pour accéder au site sans autorisation</li>
            </ul>
          </section>

          <section>
            <h2>4. Propriété Intellectuelle</h2>
            <p>
              Tout le contenu présent sur ce site web, incluant mais ne se limitant pas aux textes, graphiques, logos, 
              images, et logiciels, est la propriété exclusive d'AmeenTECH et est protégé par les lois sur la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2>5. Limitation de Responsabilité</h2>
            <p>
              AmeenTECH ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs 
              résultant de l'utilisation ou de l'impossibilité d'utiliser nos services.
            </p>
          </section>

          <section>
            <h2>6. Modifications des Conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
              Les modifications entreront en vigueur dès leur publication sur cette page.
            </p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à :
            </p>
            <p>
              <strong>Email :</strong> info@ameenaltech.com<br />
              <strong>Adresse :</strong> Cite Soprim, En face BRT(Arret Police Parcelle)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;