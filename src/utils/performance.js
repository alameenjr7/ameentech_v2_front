// Performance monitoring utilities

export const performanceMonitor = {
  // Measure function execution time
  measureTime: (fn, name) => {
    return (...args) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      if (end - start > 16) { // Only log if > 16ms (1 frame)
        console.warn(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
      }
      
      return result;
    };
  },

  // Debounce function for performance optimization
  debounce: (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function for performance optimization
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if performance is poor and suggest optimizations
  checkPerformance: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const totalTime = navigation.loadEventEnd - navigation.navigationStart;
        if (totalTime > 3000) {
          console.warn('Page load time is slow:', totalTime + 'ms');
        }
      }
    }
  }
};

// React performance hooks
export const usePerformanceMonitor = (componentName) => {
  const measureRender = (fn) => {
    return performanceMonitor.measureTime(fn, `${componentName} render`);
  };

  return { measureRender };
};