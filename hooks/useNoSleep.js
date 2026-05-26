/**
 * useNoSleep — Hook para evitar que la pantalla se apague durante una carrera.
 *
 * Envuelve la librería NoSleep.js (https://github.com/richtr/NoSleep.js)
 * que usa un video oculto en bucle para mantener la pantalla encendida.
 * Solo se activa dentro de un user gesture (click/tap).
 *
 * Uso:
 *   const { enable, disable, isActive } = useNoSleep();
 *   enable();   // Mantiene pantalla encendida
 *   disable();  // Vuelve al comportamiento normal
 *   isActive    // Booleano: true si NoSleep está activo
 */

(function () {
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useCallback = React.useCallback;

  window.useNoSleep = function useNoSleep() {
    var _useState = useState(false);
    var isActive = _useState[0];
    var setIsActive = _useState[1];
    var noSleepRef = useRef(null);

    useEffect(function () {
      if (typeof NoSleep !== "undefined") {
        try {
          noSleepRef.current = new NoSleep();
        } catch (e) {
          console.warn("[NoSleep] Init failed:", e);
        }
      }
      return function () {
        try {
          if (noSleepRef.current) {
            noSleepRef.current.disable();
            noSleepRef.current = null;
          }
        } catch (e) {}
      };
    }, []);

    var enable = useCallback(function () {
      try {
        if (noSleepRef.current) {
          noSleepRef.current.enable();
          setIsActive(true);
        }
      } catch (e) {
        console.warn("[NoSleep] Enable failed:", e);
      }
    }, []);

    var disable = useCallback(function () {
      try {
        if (noSleepRef.current) {
          noSleepRef.current.disable();
          setIsActive(false);
        }
      } catch (e) {
        console.warn("[NoSleep] Disable failed:", e);
      }
    }, []);

    return { enable: enable, disable: disable, isActive: isActive };
  };
})();
