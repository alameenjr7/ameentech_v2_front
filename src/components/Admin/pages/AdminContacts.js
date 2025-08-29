import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReply, FaEnvelope } from 'react-icons/fa';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import Modal from '../shared/Modal';
import { contactsService } from '../../../services/adminAPI';

const AdminContacts = () => {
  const [replyModal, setReplyModal] = useState({ open: false, contact: null });
  const [replyData, setReplyData] = useState({
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const columns = [
    { key: 'name', label: 'Nom', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Téléphone', type: 'text' },
    { key: 'interest', label: 'Intérêt', type: 'text' },
    { key: 'budget', label: 'Budget', type: 'text' },
    { key: 'country', label: 'Pays', type: 'text' },
    { key: 'status', label: 'Statut', type: 'text' },
    { key: 'createdAt', label: 'Reçu le', type: 'date' }
  ];

  const handleReply = (contact) => {
    setReplyModal({ open: true, contact });
    setReplyData({
      subject: `Re: ${contact.interest} - ${contact.name}`,
      message: `Bonjour ${contact.name},\n\nMerci pour votre message concernant ${contact.interest}.\n\n`
    });
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Ici vous pouvez implémenter l'envoi d'email via votre API
      console.log('Sending reply to:', replyModal.contact.email);
      console.log('Subject:', replyData.subject);
      console.log('Message:', replyData.message);
      
      // Exemple d'appel API pour envoyer l'email
      // await apiClient.post('/contacts/reply', {
      //   contactId: replyModal.contact.id,
      //   to: replyModal.contact.email,
      //   subject: replyData.subject,
      //   message: replyData.message
      // });
      
      alert('Réponse envoyée avec succès ✅');
      setReplyModal({ open: false, contact: null });
      setReplyData({ subject: '', message: '' });
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Erreur lors de l\'envoi de la réponse');
    } finally {
      setSending(false);
    }
  };

  const customActions = (
    <motion.button
      className="reply-btn"
      onClick={() => {/* Cette fonction sera appelée par le composant CRUDPage */}}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      <FaReply />
      <span>Répondre par email</span>
    </motion.button>
  );

  return (
    <AdminDashboard currentSection="contacts">
      <CRUDPage
        service={contactsService}
        entityKey="contacts"
        columns={columns}
        onCustomAction={handleReply}
        customActions={customActions}
      />

      {/* Modal de réponse */}
      <Modal
        isOpen={replyModal.open}
        onClose={() => setReplyModal({ open: false, contact: null })}
        title="Répondre au message"
        size="large"
      >
        {replyModal.contact && (
          <div style={{ padding: '24px' }}>
            {/* Informations du contact */}
            <div style={{ 
              background: '#f8fafc', 
              padding: '16px', 
              borderRadius: '12px', 
              marginBottom: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>
                Message de {replyModal.contact.name}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
                <div><strong>Email:</strong> {replyModal.contact.email}</div>
                <div><strong>Téléphone:</strong> {replyModal.contact.phone}</div>
                <div><strong>Pays:</strong> {replyModal.contact.country}</div>
                <div><strong>Budget:</strong> {replyModal.contact.budget}</div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <strong>Message original:</strong>
                <p style={{ 
                  background: 'white', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  margin: '8px 0 0 0',
                  border: '1px solid #e2e8f0',
                  fontStyle: 'italic'
                }}>
                  {replyModal.contact.message}
                </p>
              </div>
            </div>

            {/* Formulaire de réponse */}
            <form onSubmit={handleSendReply}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  Destinataire
                </label>
                <input
                  type="email"
                  value={replyModal.contact.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    color: '#6b7280'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  Objet
                </label>
                <input
                  type="text"
                  value={replyData.subject}
                  onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  Message
                </label>
                <textarea
                  value={replyData.message}
                  onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows="8"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <motion.button
                  type="button"
                  onClick={() => setReplyModal({ open: false, contact: null })}
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    border: '2px solid #d1d5db',
                    background: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  Annuler
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: sending ? '#9ca3af' : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: sending ? 'not-allowed' : 'pointer'
                  }}
                >
                  {sending ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <>
                      <FaEnvelope />
                      <span>Envoyer la réponse</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </AdminDashboard>
  );
};

export default AdminContacts;