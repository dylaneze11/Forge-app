/**
 * useRunPersistence — Persiste el estado de la carrera al ir a background.
 *
 * Guarda en localStorage cuando el usuario bloquea el celular (visibilitychange),
 * detecta una carrera guardada al montar el componente,
 * y compensa el tiempo transcurrido al volver al frente.
 *
 * Uso:
 *   const { savedRun, timeOffset, clear, acknowledgeResume } = useRunPersistence({
 *     elapsedSec, distanceKm, routePoints, isRunning, isPaused
 *   });
 *
 *   savedRun       → { elapsedSec, distanceKm, points, isPaused, timestamp } o null
 *   timeOffset     → segundos transcurridos desde la última vez que se guardó
 *   clear()        → elimina la carrera guardada de localStorage
 *   acknowledgeResume() → marca como leída la carrera guardada (sin borrar datos)
 */

(function () {
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useCallback = React.useCallback;
  var STORAGE_KEY = "forge_active_run";

  window.useRunPersistence = function useRunPersistence(runState) {
    var elapsedSec = runState.elapsedSec;
    var distanceKm = runState.distanceKm;
    var routePoints = runState.routePoints;
    var isRunning = runState.isRunning;
    var isPaused = runState.isPaused;

    var _useState = useState(null);
    var savedRun = _useState[0];
    var setSavedRun = _useState[1];

    var _useState2 = useState(0);
    var timeOffset = _useState2[0];
    var setTimeOffset = _useState2[1];

    var lastSavedRef = useRef(null);

    // Mantener el ref actualizado con el último estado
    useEffect(function () {
      if (!isRunning) return;
      lastSavedRef.current = {
        elapsedSec: elapsedSec,
        distanceKm: distanceKm,
        points: routePoints,
        isPaused: isPaused,
        timestamp: Date.now(),
      };
    });

    // Guardar en localStorage al ir a background
    useEffect(function () {
      var handleVisibility = function () {
        if (document.hidden && lastSavedRef.current) {
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(lastSavedRef.current)
            );
          } catch (e) {
            console.warn("[RunPersistence] Save failed:", e);
          }
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return function () {
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    }, []);

    // Al montar: detectar carrera guardada
    useEffect(function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        var saved = JSON.parse(raw);
        var elapsedAgo = Date.now() - saved.timestamp;
        if (saved.elapsedSec > 5 && elapsedAgo < 2 * 60 * 60 * 1000) {
          setSavedRun(saved);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, []);

    // Al volver al frente: compensar tiempo
    useEffect(function () {
      var handleVisibility = function () {
        if (!document.hidden) {
          try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
              var saved = JSON.parse(raw);
              var elapsedMs = Date.now() - saved.timestamp;
              if (elapsedMs > 2000) {
                setTimeOffset(Math.floor(elapsedMs / 1000));
              }
            }
          } catch (e) {}
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return function () {
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    }, []);

    var clear = useCallback(function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
        setSavedRun(null);
        setTimeOffset(0);
      } catch (e) {}
    }, []);

    var acknowledgeResume = useCallback(function () {
      setSavedRun(null);
    }, []);

    return {
      savedRun: savedRun,
      timeOffset: timeOffset,
      clear: clear,
      acknowledgeResume: acknowledgeResume,
    };
  };
})();
