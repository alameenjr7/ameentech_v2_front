import React, { useState, useMemo } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaToggleOn, 
  FaToggleOff,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaReply
} from 'react-icons/fa';
import './DataTable.css';

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  onToggle,
  onCustomAction,
  canEdit = true,
  canDelete = true,
  canView = false,
  canToggle = false,
  isLoading = false,
  searchable = true,
  sortable = true,
  itemsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search term to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoized filter data based on search term
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) return data;
    return data.filter(item =>
      columns.some(column =>
        String(item[column.key] || '').toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [data, columns, debouncedSearchTerm]);

  // Memoized sort filtered data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortable) return <FaSort className="sort-icon inactive" />;
    
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' 
        ? <FaSortUp className="sort-icon active" />
        : <FaSortDown className="sort-icon active" />;
    }
    return <FaSort className="sort-icon" />;
  };

  const formatValue = (value, column) => {
    if (value === null || value === undefined) return '-';

    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString('fr-FR');
      case 'datetime':
        return new Date(value).toLocaleString('fr-FR');
      case 'boolean':
        return value ? 'Oui' : 'Non';
      case 'email':
        return <a href={`mailto:${value}`} className="email-link">{value}</a>;
      case 'url':
        return value ? <a href={value} target="_blank" rel="noopener noreferrer" className="url-link">Lien</a> : '-';
      case 'image':
        return value ? <img src={value} alt="" className="table-image" /> : '-';
      case 'truncate':
        return value.length > 50 ? `${value.substring(0, 50)}...` : value;
      default:
        return String(value);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (isLoading) {
    return (
      <div className="data-table-loading">
        <div className="spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <motion.div className="data-table-container" {...fadeIn}>
      {searchable && (
        <div className="table-header">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="table-info">
            <span>{sortedData.length} résultat(s)</span>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={sortable ? 'sortable' : ''}
                >
                  <div className="th-content">
                    <span>{column.label}</span>
                    {getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView || onToggle || onCustomAction) && (
                <th className="actions-column">Actions</th>
              )}
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="no-data">
                  Aucune donnée disponible
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <motion.tr
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="data-row"
                >
                  {columns.map((column) => (
                    <td key={column.key} className={column.className || ''}>
                      {formatValue(item[column.key], column)}
                    </td>
                  ))}
                  
                  {(onEdit || onDelete || onView || onToggle || onCustomAction) && (
                    <td className="actions-cell">
                      <div className="actions-buttons">
                        {onView && (
                          <motion.button
                            className="action-btn view"
                            onClick={() => onView(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Voir"
                          >
                            <FaEye />
                          </motion.button>
                        )}
                        
                        {onEdit && (
                          <motion.button
                            className="action-btn edit"
                            onClick={() => onEdit(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Modifier"
                          >
                            <FaEdit />
                          </motion.button>
                        )}

                        {onCustomAction && (
                          <motion.button
                            className="action-btn reply"
                            onClick={() => onCustomAction(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Répondre"
                          >
                            <FaReply />
                          </motion.button>
                        )}
                        
                        {canToggle && (
                          <motion.button
                            className={`action-btn toggle ${item.active ? 'active' : 'inactive'}`}
                            onClick={() => onToggle(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={item.active ? 'Désactiver' : 'Activer'}
                          >
                            {item.active ? <FaToggleOn /> : <FaToggleOff />}
                          </motion.button>
                        )}
                        
                        {onDelete && (
                          <motion.button
                            className="action-btn delete"
                            onClick={() => onDelete(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Supprimer"
                          >
                            <FaTrash />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          
          <div className="pagination-info">
            <span>
              Page {currentPage} sur {totalPages}
            </span>
          </div>
          
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DataTable;