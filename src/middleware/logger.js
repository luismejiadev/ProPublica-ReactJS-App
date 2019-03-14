import Settings from '../settings/settings'
import * as logger from 'loglevel'
/*
https://www.npmjs.com/package/loglevel
5 actual logging methods, ordered and available as:

log.trace(msg)
log.debug(msg)
log.info(msg)
log.warn(msg)
log.error(msg)
log.log(msg) is also available, as an alias for log.debug(msg), to improve compatibility with console, and make migration easier.

*/
if (Settings.DEBUG) {
  logger.setLevel(logger.levels.DEBUG);
} else {
  logger.setLevel(logger.levels.ERROR);
}

export default logger